import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { UnauthorizedException } from '../exceptions';
import { User } from '../../module/user/user.module';

export const authenticateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('local', (error, user: User) => {
    // Something went wrong in the authentication process
    if (error) {
      return next(error);
    }

    // Credentials were invalid
    if (!user) {
      return next(new UnauthorizedException('Invalid username or password'));
    }

    req.logIn(user, (error) => {
      // Something went wrong in the log in process
      if (error) {
        return next(error);
      }

      // User successfully logged in, allow him to access the resource
      return next();
    });
  })(req, res, next);
};
