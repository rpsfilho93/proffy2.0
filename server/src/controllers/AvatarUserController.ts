import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import aws from 'aws-sdk';
import mime from 'mime';

import db from '../database/connection';
import uploadConfig from '../config/upload';

export default class AvatarUserController {
  async update(request: Request, response: Response) {
    const user_id = request.user.id;
    const filename = request.file.filename;
    const user = await db('users').where({ id: user_id });

    if (!user[0]) {
      return response.status(400).json({ message: 'User not found.' });
    }

    if(process.env.NODE_ENV === 'production') {

      const client = new aws.S3({
        region: 'us-east-2'
      });

      if (user[0].avatar) {
        await client.deleteObject({
          Bucket: 'app-proffy',
          Key: user[0].avatar,
        }).promise();
      }

      const originalPath = path.resolve(uploadConfig.tmpFolder, filename);

      const ContentType = mime.getType(originalPath);

      if(!ContentType) {
        throw new Error('File not found.');
      }

      const fileContent = await fs.promises.readFile(originalPath);

      await client.putObject({
        Bucket: 'app-proffy',
        Key: filename,
        ACL: 'public-read',
        Body: fileContent,
        ContentType, 
      }).promise();

      await db('users').where({ id: user_id }).update({ avatar: filename });

      const updatedUser = await db('users').where({ id: user_id });
      delete updatedUser[0].password;
    
      return response.json({
        ...updatedUser[0],
        avatar_url: updatedUser[0].avatar
          ? `${process.env.AWS_URL}/${updatedUser[0].avatar}`
          : null,
      });
    }

    if (user[0].avatar) {
      const filePath = path.resolve(uploadConfig.uploadsFolder, user[0].avatar);

      try {
        await fs.promises.stat(filePath);
      } catch {
        return;
      }

      await fs.promises.unlink(filePath);
    }

    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, filename),
      path.resolve(uploadConfig.uploadsFolder, filename),
    );
    
    await db('users').where({ id: user_id }).update({ avatar: filename });

    const updatedUser = await db('users').where({ id: user_id });
    delete updatedUser[0].password;

    return response.json({
      ...updatedUser[0],
      avatar_url: updatedUser[0].avatar
        ? `${process.env.APP_API_URL}/files/${updatedUser[0].avatar}`
        : null,
    });
  }
}
