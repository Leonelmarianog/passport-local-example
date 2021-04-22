import { NextFunction, Response } from 'express';
import { UnauthorizedException } from '../exceptions';
import { RequestWithUser } from '../interface/request-with-user.interface';

export const isAdminMiddleware = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.isAdmin) {
    throw new UnauthorizedException(
      "You're not authorized to view this resource"
    );
  }

  next();
};
