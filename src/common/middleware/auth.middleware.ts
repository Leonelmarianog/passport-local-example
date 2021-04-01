import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../enums';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const isUserAuthenticated = req.isAuthenticated();

  if (isUserAuthenticated) {
    next();
  } else {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "You're not authorized to view this resource." });
  }
};
