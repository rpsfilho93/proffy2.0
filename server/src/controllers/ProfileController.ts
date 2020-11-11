import { Request, Response } from 'express';
import db from '../database/connection';
import { hash, compare } from 'bcryptjs';

export default class ProfileController {
  async update(request: Request, response: Response) {
    const user_id = request.user.id;
    const {
      firstName,
      lastName,
      whatsapp,
      bio,
      email,
      password,
      old_password,
    } = request.body;

    const user = await db('users').where({ id: user_id });

    const checkEmail = await db('users').where('users.email', '=', email);

    if (checkEmail[0] && String(checkEmail[0].id) !== user_id) {
      return response
        .status(400)
        .json({ message: 'This email is already been used' });
    }

    if (password) {
      if (!old_password) {
        return response.status(400).json({ message: 'Missing old password.' });
      }

      const checkOldPassword = await compare(old_password, user[0].password);

      if (!checkOldPassword) {
        return response.status(400).json({ message: 'Wrong password' });
      }

      user[0].password = await hash(password, 8);
    }

    await db('users').where({ id: user_id }).update({
      firstName,
      lastName,
      whatsapp,
      bio,
      email,
      password: user[0].password,
    });

    const updatedUser = await db('users').where({ id: user_id });

    delete updatedUser[0].password;

    if(process.env.NODE_ENV === 'production') {
      return response.json({
        ...updatedUser[0],
        avatar_url: user[0].avatar
          ? `${process.env.AWS_URL}/${user[0].avatar}`
          : null,
      });
    }

    return response.json({
      ...updatedUser[0],
      avatar_url: user[0].avatar
        ? `${process.env.APP_API_URL}/files/${user[0].avatar}`
        : null,
    });
  }

  async show(request: Request, response: Response) {
    const user_id = request.user.id;

    const user = await db('users').where('users.id', '=', user_id);

    if (!user[0]) {
      return response.status(400).json({ message: 'User does not exists.' });
    }

    delete user[0].password;

    const classes = await db('classes')
      .select(['id', 'subject', 'cost'])
      .where('classes.user_id', '=', user_id);

    if (!classes[0]) {
      return response.json({ user: user[0] });
    }

    const schedule = await db('class_schedule')
      .select(['week_day', 'from', 'to'])
      .where('class_schedule.class_id', '=', classes[0].id);

    return response.json({ user: user[0], classes: classes[0], schedule });
  }
}
