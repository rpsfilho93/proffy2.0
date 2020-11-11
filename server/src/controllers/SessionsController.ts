import { Request, Response } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import db from '../database/connection';
import authConfig from '../config/auth';

export default class SessionsController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await db('users').where('users.email', '=', email);

    if (!user[0]) {
      return response
        .status(400)
        .json({ message: 'Wrong email/password combination' });
    }

    const passwordsMatched = await compare(password, user[0].password);

    if (!passwordsMatched) {
      return response
        .status(400)
        .json({ message: 'Wrong email/password combination' });
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, { subject: String(user[0].id), expiresIn });

    delete user[0].password;

    if(process.env.NODE_ENV === 'production') {
      return response.json({
        user: {
          ...user[0],
          avatar_url: user[0].avatar
            ? `${process.env.AWS_URL}/${user[0].avatar}`
            : null,
        },
        token,
      });
    }

    return response.json({
      user: {
        ...user[0],
        avatar_url: user[0].avatar
          ? `${process.env.APP_API_URL}/files/${user[0].avatar}`
          : null,
      },
      token,
    });
  }
}
