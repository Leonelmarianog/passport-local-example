import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../enums';
import { UnauthorizedException } from '../exceptions';

export const isAuthenticatedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isUserAuthenticated = req.isAuthenticated();

  if (!isUserAuthenticated) {
    throw new UnauthorizedException(
      "You're not authorized to view this resource"
    );
  }

  next();
};
