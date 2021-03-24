import { plainToClass } from 'class-transformer';
import { NextFunction, Request, RequestHandler, Response } from 'express';

export const transformationMiddleware = (type: any): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const plainObject = req.body;
    const newClassInstance = plainToClass(type, plainObject);
    req.body = newClassInstance;
    next();
  };
};
