import { HttpException } from './http.exception';

export class NotFoundException extends HttpException {
  constructor(public readonly message: string) {
    super(404, message);
  }
}
