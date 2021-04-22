import { HttpStatus } from '../enums';
import { HttpException } from './http.exception';

export class NotFoundException extends HttpException {
  constructor(
    objectOrError: string | Record<string, any>,
    description = 'Not Found'
  ) {
    super(HttpStatus.NOT_FOUND, objectOrError, description);
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}
