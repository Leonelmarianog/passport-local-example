import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../enums';
import { HttpException } from '../exceptions';

export const errorHandlerMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  console.log(error);
  const statusCode = error.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
  const description = error.getDescription() || 'Internal Server Error';
  const details = error.getDetails();

  if (details) {
    return res
      .status(statusCode)
      .json(error.createBody(statusCode, description, details));
  }

  res.status(statusCode).json(error.createBody(statusCode, description));
};
