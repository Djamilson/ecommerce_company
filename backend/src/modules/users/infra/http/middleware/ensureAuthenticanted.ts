import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppErrorAuth from '@shared/errors/AppErrorAuth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  company_id: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppErrorAuth('Token not present', 'token.invalid', 401);
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    throw new AppErrorAuth('Token not present', 'token.invalid', 401);
  }

  try {
    const decoded = verify(token, authConfig.jwt.secretToken);

    const { sub, company_id } = decoded as ITokenPayload;

    request.user = {
      id: sub,
      company_id,
    };

    return next();
  } catch (err) {
    throw new AppErrorAuth('Token invalid.', 'token.invalid', 401);
  }
}
