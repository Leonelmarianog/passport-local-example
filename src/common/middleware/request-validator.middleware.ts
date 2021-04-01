import { NextFunction, Request, RequestHandler, Response } from 'express';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import { HttpException } from '../exceptions';

const getConstraints = (errors: ValidationError[]): string[] => {
  return errors.reduce((arr: string[], error) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const constraints = Object.values(error.constraints!);
    return arr.concat(constraints);
  }, []);
};

export const requestValidatorMiddleware = (
  validatorOptions?: ValidatorOptions
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    validate(req.body, validatorOptions).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const constraints = getConstraints(errors);
        next(new HttpException(400, 'Validation Error', constraints));
      } else {
        next();
      }
    });
  };
};