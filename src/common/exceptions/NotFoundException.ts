import { HttpException } from './HttpException';

export class NotFoundException extends HttpException {
  constructor(public readonly message: string) {
    super(404, message);
  }
}
