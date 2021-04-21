import { Request } from 'express';
import { User } from '../../module/user/user.module';

export interface RequestWithUser extends Request {
  user: User;
}
