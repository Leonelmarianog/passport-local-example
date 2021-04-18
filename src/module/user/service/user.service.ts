import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { encryptPassword } from '../../../common/helpers/encryption.helper';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findAll() {
    return this.userRepository.findAll();
  }

  public async findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  public async create(createUserDto: CreateUserDto) {
    const hashedPassword = encryptPassword(createUserDto.password);
    createUserDto.password = hashedPassword;
    return this.userRepository.create(createUserDto);
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const hashedPassword = encryptPassword(updateUserDto.password);
      updateUserDto.password = hashedPassword;
    }

    return this.userRepository.update(id, updateUserDto);
  }

  public async delete(id: string) {
    return this.userRepository.delete(id);
  }
}
