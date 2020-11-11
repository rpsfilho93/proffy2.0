import { Request, Response } from 'express';
import db from '../database/connection';
import convertHoursToMinutes from '../utils/convertHoursToMinutes';
import shuffle from '../utils/shuffle';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    let page = Number(filters.page) || 1;
    const per_page = Number(filters.per_page) || 4;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    if (page < 1) page = 1;

    const offset = (page - 1) * per_page;

    if (!subject && !week_day && !time) {
      const classes = await db('classes').offset(offset).limit(per_page);

      const teachers = await db('users').whereIn(
        'id',
        classes.map((cls) => cls.user_id)
      );

      const schedules = await db('class_schedule').whereIn(
        'class_id',
        classes.map((cls) => cls.id)
      );

      const users = teachers.map((user) => { 
        delete user.password;

        if(process.env.NODE_ENV === 'production') {
          return (
            {
              ...user,
              avatar_url: user.avatar
              ? `${process.env.AWS_URL}/${user.avatar}`
              : null,
            }
          );
        }

        return (
          {
            ...user,
            avatar_url: user.avatar
            ? `${process.env.APP_API_URL}/files/${user.avatar}`
            : null,
          }
        );
      });

      return response.json({ classes, teachers: users, schedules });
    }

    if (subject && !week_day && !time) {
      const classes = await db('classes').where('subject', '=', subject).offset(offset).limit(per_page);

      const teachers = await db('users').whereIn(
        'id',
        classes.map((cls) => cls.user_id)
      );

      const schedules = await db('class_schedule').whereIn(
        'class_id',
        classes.map((cls) => cls.id)
      );

      const users = teachers.map((user) => { 
        delete user.password;

        if(process.env.NODE_ENV === 'production') {
          return (
            {
              ...user,
              avatar_url: user.avatar
              ? `${process.env.AWS_URL}/${user.avatar}`
              : null,
            }
          );
        }

        return (
          {
            ...user,
            avatar_url: user.avatar
            ? `${process.env.APP_API_URL}/files/${user.avatar}`
            : null,
          }
        );
      });

      return response.json({ classes, teachers: users, schedules });
    }

    if (subject && week_day && time) {
      const timeInMinutes = convertHoursToMinutes(time);

      const classes = await db('classes')
        .whereExists(function () {
          this.select('class_schedule.*')
            .from('class_schedule')
            .whereRaw('class_schedule.class_id = classes.id')
            .whereRaw('class_schedule.week_day = ??', [Number(week_day)])
            .whereRaw('class_schedule.from <= ??', [timeInMinutes])
            .whereRaw('class_schedule.to >= ??', [timeInMinutes]);
        })
        .where('classes.subject', '=', subject).offset(offset).limit(per_page);

      const schedules = await db('class_schedule').whereIn(
        'class_id',
        classes.map((item) => item.id)
      );

      const teachers = await db('users').whereIn(
        'id',
        classes.map((clss) => clss.user_id)
      );

      const users = teachers.map((user) => { 
        delete user.password;

        if(process.env.NODE_ENV === 'production') {
          return (
            {
              ...user,
              avatar_url: user.avatar
              ? `${process.env.AWS_URL}/${user.avatar}`
              : null,
            }
          );
        }

        return (
          {
            ...user,
            avatar_url: user.avatar
            ? `${process.env.APP_API_URL}/files/${user.avatar}`
            : null,
          }
        );
      });

      return response.json({ classes, teachers: users, schedules });
    }

    return response
      .status(400)
      .json({ error: 'Missing subject filter for the class search.' });
  }

  async create(request: Request, response: Response) {
    const {
      firstName,
      lastName,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = request.body;

    const user_id = request.user.id;

    const trx = await db.transaction();

    try {
      await trx('users').where({ id: user_id }).update({
        firstName,
        lastName,
        whatsapp,
        bio,
      });

      const hasClass = await trx('classes').where({ user_id });

      if (hasClass.length > 0) {
        await trx('classes').where({ user_id }).update({
          subject,
          cost,
        });

        await trx('class_schedule').where({ class_id: hasClass[0].id }).del();

        const scheduleClass = schedule.map((scheduleItem: ScheduleItem) => ({
          class_id: hasClass[0].id,
          week_day: scheduleItem.week_day,
          from: convertHoursToMinutes(scheduleItem.from),
          to: convertHoursToMinutes(scheduleItem.to),
        }));

        await trx('class_schedule').insert(scheduleClass);

        await trx.commit();

        return response.status(201).send();
      }

      const insertedClassesIds = await trx('classes').insert({
        user_id,
        subject,
        cost,
      }).returning('id');

      const class_id = insertedClassesIds[0];

      const scheduleClass = schedule.map((scheduleItem: ScheduleItem) => ({
        class_id,
        week_day: scheduleItem.week_day,
        from: convertHoursToMinutes(scheduleItem.from),
        to: convertHoursToMinutes(scheduleItem.to),
      }));

      await trx('class_schedule').insert(scheduleClass);

      await trx.commit();

      return response.status(201).send();
    } catch (err) {
      console.log(err);
      await trx.rollback();

      return response
        .status(400)
        .json({ error: 'An Error occurred while creating a new class.' });
    }
  }
}
