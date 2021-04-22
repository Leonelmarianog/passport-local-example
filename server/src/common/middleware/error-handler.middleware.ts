import { NextFunction, Request, Response } from 'express';
import { HttpException, InternalServerErrorException } from '../exceptions';

export const errorHandlerMiddleware = (
  error: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  // eslint-disable-next-line no-console
  console.log(error);

  if (error instanceof HttpException) {
    const body = error.createBody();
    return res.status(body.statusCode).json(body);
  }

  const internalServerError = new InternalServerErrorException(error.message);
  const body = internalServerError.createBody();

  res.status(body.statusCode).json(body);
};
