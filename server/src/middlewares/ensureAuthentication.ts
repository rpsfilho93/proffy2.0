import { Request, Response, NextFunction } from 'express';
import authConfig from '../config/auth';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: 'JWT token is missing' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, String(authConfig.jwt.secret));

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    return response.status(401).json({ message: 'Invalid JWT token' });
  }
}
