import { Request, Response } from 'express';
import db from '../database/connection';

export default class FavoritesController {
  async create(request: Request, response: Response) {
    const user_id = request.user.id;
    const { teacher_id } = request.body;

    const teacher = await db('users').where({ id: teacher_id });

    if(!teacher[0]) {
      return response.status(400).json({ error: 'Teacher does not exists.' })
    }

    await db('favorites').insert({
      user_id,
      teacher_id
    });

    return response.status(201).send();
  }

  async index(request: Request, response: Response) {
    const user_id = request.user.id;

    const trx = await db.transaction();
    
    try {
      const favorites = await trx('favorites').where('user_id', '=', user_id);

      const classes = await trx('classes').whereIn(
        'user_id', 
        favorites.map((fav) => fav.teacher_id)
      );

      const schedules = await trx('class_schedule').whereIn(
        'class_id',
        classes.map((clss) => clss.id)
      );

      const teachers = await trx('users').whereIn(
        'id',
        favorites.map((fav) => fav.teacher_id)
      );

      await trx.commit();
      
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

    } catch (err) {
      console.log(err);
      await trx.rollback();

      return response
        .status(400)
        .json({ error: 'An Error occurred while creating a new class.' });
    }
  }

  async delete(request: Request, response: Response) {
    const user_id = request.user.id;
    const { teacher_id } = request.query;

    const teacher = await db('users').where({id: teacher_id});

    if(!teacher[0]) {
      return response.status(404).json({ error: 'Teacher does not exists.' })
    }

    await db('favorites').where({ user_id, teacher_id }).del();

    return response.status(204).send();
  }
} 