import { NextFunction, Request, Response } from 'express';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const isUserAuthenticated = req.isAuthenticated();

  if (isUserAuthenticated) {
    next();
  } else {
    res
      .status(400)
      .json({ message: "You're not authorized to view this resource." });
  }
};
