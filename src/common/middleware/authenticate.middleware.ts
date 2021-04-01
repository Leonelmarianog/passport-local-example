import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { UnauthorizedException } from '../exceptions';
import { User } from '../../modules/users/users.module';

export const authenticateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('local', (error: any, user: User) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return next(new UnauthorizedException('Invalid username or password'));
    }

    req.logIn(user, (error: any) => {
      if (error) {
        return next(error);
      }

      return next();
    });
  })(req, res, next);
};
