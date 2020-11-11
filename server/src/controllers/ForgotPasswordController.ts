import { Request, Response } from 'express';
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import db from '../database/connection';

export default class ForgotPasswordController {
  async create(request: Request, response: Response) {
    const { email } = request.body;

    const user = await db('users').where('users.email', '=', email);

    if (!user[0]) {
      return response
        .status(400)
        .json({ message: 'This email is not registered.' });
    }

    const { id, firstName } = user[0];

    const token = uuidv4();

    await db('user_tokens').insert({ token, user_id: id });

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    );

    const templateContent = await fs.promises.readFile(forgotPasswordTemplate, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateContent);

    if(process.env.NODE_ENV === 'production') {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false, 
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        }
      });

      await transporter.sendMail({
        from: {
          name: 'Equipe Proffy',
          address: 'rpso.filho@gmail.com',
        },
        to: {
          name: firstName,
          address: email,
        },
        subject: 'Recupere sua senha',
        html: parseTemplate({
          name: firstName,
          link: `${process.env.APP_PROD_URL}/reset-password?token=${token}`,
        }),
      });

    } else {
      nodemailer.createTestAccount().then(async (account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        const message = await transporter.sendMail({
          from: {
            name: 'Equipe Proffy',
            address: 'contato@proffy.com',
          },
          to: {
            name: firstName,
            address: email,
          },
          subject: 'Recupere sua senha',
          html: parseTemplate({
            name: firstName,
            link: `http://localhost:3000/reset-password?token=${token}`,
          }),
        });

        console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));

        
      });
    }

    return response.status(201).send();
  }
}
