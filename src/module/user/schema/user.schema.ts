import { EntitySchema } from 'typeorm';
import { User } from '../entity/user.entity';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
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
    createdAt: {
      type: 'timestamp with time zone',
      name: 'created_at',
      createDate: true,
    },
    updatedAt: {
      type: 'timestamp with time zone',
      name: 'updated_at',
      updateDate: true,
    },
    deletedAt: {
      type: 'timestamp with time zone',
      name: 'deleted_at',
      deleteDate: true,
    },
  },
});
