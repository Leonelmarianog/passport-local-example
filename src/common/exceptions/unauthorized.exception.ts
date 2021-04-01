import { HttpException } from './http.exception';

export class UnauthorizedException extends HttpException {
  constructor(description: string, details?: Record<string, any>) {
    super(401, description, details);
  }
}
