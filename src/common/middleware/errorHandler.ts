import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';

export const errorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Something went wrong.';

  res.status(statusCode).json({ statusCode, message });
};
