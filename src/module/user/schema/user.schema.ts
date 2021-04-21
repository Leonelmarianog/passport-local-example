import { BaseSchema } from '../../../common/schema';
import { User } from '../entity/user.entity';

export const UserSchema = new BaseSchema<User>({
  name: 'User',
  target: User,
  tableName: 'users',
  columns: {
    firstName: {
      type: String,
      name: 'first_name',
    },
    lastName: {
      type: String,
      name: 'last_name',
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      name: 'is_admin',
    },
  },
});
