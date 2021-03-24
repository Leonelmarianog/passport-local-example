import { NextFunction, Request, Response } from 'express';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import { HttpException } from '../exceptions/HttpException';

const getConstraints = (errors: ValidationError[]): string[] => {
  return errors.reduce((constraints: string[], error) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const constraintsArray = Object.values(error.constraints!);
    return constraints.concat(constraintsArray);
  }, []);
};

export const validationMiddleware = (validatorOptions?: ValidatorOptions) => {
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
