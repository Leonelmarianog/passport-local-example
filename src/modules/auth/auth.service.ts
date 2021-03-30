import { generatePassword } from '../../utils/passwordUtils';
import { UsersService } from '../users/users.module';
import { RegisterDto } from './dto/register.dto';

export class AuthService {
  constructor(private readonly userService: UsersService) {}

  public register = async (registerDto: RegisterDto) => {
    const { firstName, lastName, email, password } = registerDto;
    const { hash, salt } = generatePassword(password);

    const user = await this.userService.create({
      firstName,
      lastName,
      email,
      hash,
      salt,
    });

    return user;
  };
}
