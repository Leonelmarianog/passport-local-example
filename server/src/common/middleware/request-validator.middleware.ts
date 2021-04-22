import { RequestHandler } from 'express';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import { BadRequestException } from '../exceptions';

const getConstraints = (errors: ValidationError[]): string[] => {
  const constraints = errors.reduce((arr: string[], error) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const constraints = Object.values(error.constraints!);
    return arr.concat(constraints);
  }, []);

  return constraints;
};

const validateRequest = async (
  request: any,
  validatorOptions?: ValidatorOptions
) => {
  const errors = await validate(request, validatorOptions);

  if (errors.length > 0) {
    const constraints = getConstraints(errors);
    return constraints;
  }

  return [];
};

export const requestValidatorMiddleware = (
  validatorOptions?: ValidatorOptions
): RequestHandler => {
  return async (req, res, next) => {
    const constraints = await validateRequest(req.body, validatorOptions);

    if (constraints.length > 0) {
      return next(new BadRequestException(constraints));
    }

    return next();
  };
};
