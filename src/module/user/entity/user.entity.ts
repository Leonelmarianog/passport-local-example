import { BaseEntity } from '../../../common/entity';

export class User extends BaseEntity {
  public firstName!: string;

  public lastName!: string;

  public email!: string;

  public password!: string;
}
