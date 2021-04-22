import { HttpStatus } from '../enums';
import { HttpException } from './http.exception';

export class UnauthorizedException extends HttpException {
  constructor(
    objectOrError: string | Record<string, any>,
    description = 'Unauthorized'
  ) {
    super(HttpStatus.UNAUTHORIZED, objectOrError, description);
    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }
}
