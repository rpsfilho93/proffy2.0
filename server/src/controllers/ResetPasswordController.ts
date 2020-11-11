import { Request, Response } from 'express';
import { addHours, isAfter, parseISO } from 'date-fns';
import { hash } from 'bcryptjs';
import db from '../database/connection';

export default class ResetPasswordController {
  async create(request: Request, response: Response) {
    const { password, token } = request.body;

    const userToken = await db('user_tokens').where(
      'user_tokens.token',
      '=',
      token
    );

    if (!userToken[0]) {
      return response.status(400).json({ message: 'Token does not exists' });
    }

    const user = await db('users').where('users.id', '=', userToken[0].user_id);

    if (!user[0]) {
      return response.status(400).json({ message: 'User does not exists' });
    }

    const twoHoursAfter = addHours(parseISO(userToken[0].created_at), 2);

    if (isAfter(Date.now(), twoHoursAfter)) {
      return response.status(401).json({ message: 'Token is expired' });
    }

    const hashedPassword = await hash(password, 8);

    await db('users')
      .where('users.id', '=', user[0].id)
      .update({ password: hashedPassword });

    await db('user_tokens').where({ id: userToken[0].id }).del();

    return response.send();
  }
}
