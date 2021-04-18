import { EntitySchema } from 'typeorm';
import { BaseSchema } from '../../../common/schema';
import { User } from '../entity/user.entity';

export const UserSchema = new EntitySchema<User>({
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
    ...BaseSchema,
  },
});
