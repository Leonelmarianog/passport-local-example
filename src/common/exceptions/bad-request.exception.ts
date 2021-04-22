import { HttpStatus } from '../enums';
import { HttpException } from './http.exception';

export class BadRequestException extends HttpException {
  constructor(
    objectOrError: string | Record<string, any>,
    description = 'Bad Request'
  ) {
    super(HttpStatus.BAD_REQUEST, objectOrError, description);
    Object.setPrototypeOf(this, BadRequestException.prototype);
  }
}
