import { BaseEntity } from '../../../common/entity';
import { encryptPassword } from '../../../common/helpers/encryption.helper';

export class User extends BaseEntity {
  public firstName?: string;
  public lastName?: string;
  public email?: string;
  public password?: string;

  setPassword(password: string) {
    this.password = encryptPassword(password);
  }
}
