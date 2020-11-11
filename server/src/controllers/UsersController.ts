import { Request, Response } from 'express';
import { hash } from 'bcryptjs';
import db from '../database/connection';

export default class UsersController {
  async create(request: Request, response: Response) {
    const { firstName, lastName, email, password } = request.body;

    try {
      const emailAlreadyExists = await db('users').where(
        'users.email',
        '=',
        email
      );

      if (emailAlreadyExists[0]) {
        return response.status(400).json({ message: 'Email already in use.' });
      }

      const hashedPassword = await hash(password, 8);

      await db('users').insert({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      return response.status(201).send();
    } catch (err) {
      console.log(err);
    }
  }
}
