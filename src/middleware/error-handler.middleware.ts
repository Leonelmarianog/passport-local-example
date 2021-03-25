import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/http.exception';

export const errorHandlerMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const statusCode = error.getStatus() || 500;
  const description = error.getDescription() || 'Internal Server Error';
  const details = error.getDetails();

  if (details) {
    return res
      .status(statusCode)
      .json(error.createBody(statusCode, description, details));
  }

  res.status(statusCode).json(error.createBody(statusCode, description));
};
