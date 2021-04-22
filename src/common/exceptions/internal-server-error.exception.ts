import { HttpStatus } from '../enums';
import { HttpException } from './http.exception';

export class InternalServerErrorException extends HttpException {
  constructor(
    objectOrError: string | Record<string, any>,
    description = 'Internal Server Error'
  ) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, objectOrError, description);
    Object.setPrototypeOf(this, InternalServerErrorException.prototype);
  }
}
