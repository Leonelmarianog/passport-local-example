import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../enums';
import { HttpException } from '../exceptions';

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
    const statusCode = error.getStatus();
    const description = error.getDescription();
    const details = error.getDetails();

    if (details) {
      return res
        .status(statusCode)
        .json(error.createBody(statusCode, description, details));
    }

    res.status(statusCode).json(error.createBody(statusCode, description));
  } else {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal Server Error',
    });
  }
};
