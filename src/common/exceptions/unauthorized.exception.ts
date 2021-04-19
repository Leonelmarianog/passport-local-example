import { HttpStatus } from '../enums';
import { HttpException } from './http.exception';

export class UnauthorizedException extends HttpException {
  constructor(description: string, details?: Record<string, any>) {
    super(HttpStatus.UNAUTHORIZED, description, details);
    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }
}
