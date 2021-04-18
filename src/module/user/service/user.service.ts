import { UserRepository } from '../repository/user.repository';
import { NotFoundException } from '../../../common/exceptions';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { encryptPassword } from '../../../common/helpers/encryption.helper';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findAll() {
    return this.userRepository.find();
  }

  public async findOne(id: string) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  public async create(createUserDto: CreateUserDto) {
    const hashedPassword = encryptPassword(createUserDto.password);
    createUserDto.password = hashedPassword;
    const user = this.userRepository.create(createUserDto);

    return this.userRepository.save(user);
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const hashedPassword = encryptPassword(updateUserDto.password);
      updateUserDto.password = hashedPassword;
    }

    const newUser = await this.userRepository.preload({
      id: +id,
      ...updateUserDto,
    });

    if (!newUser) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return this.userRepository.save(newUser);
  }

  public async delete(id: string) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }
}
