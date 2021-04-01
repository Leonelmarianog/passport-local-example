import { HttpStatus } from '../enums';
import { HttpException } from './http.exception';

export class NotFoundException extends HttpException {
  constructor(public readonly message: string) {
    super(HttpStatus.NOT_FOUND, message);
  }
}
