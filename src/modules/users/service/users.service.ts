import { Repository } from 'typeorm';
import { NotFoundException } from '../../../common/exceptions';
import { User } from '../entities/user.entity';
import bcrypt from 'bcrypt';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

export class UsersService {
  constructor(private readonly usersRepository: Repository<User>) {}

  public async findAll() {
    return this.usersRepository.find();
  }

  public async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  public async create(createUserDto: CreateUserDto) {
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    const user = this.usersRepository.create(createUserDto);

    return this.usersRepository.save(user);
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const hashedPassword = bcrypt.hashSync(updateUserDto.password, 10);
      updateUserDto.password = hashedPassword;
    }

    const newUser = await this.usersRepository.preload({
      id: +id,
      ...updateUserDto,
    });

    if (!newUser) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return this.usersRepository.save(newUser);
  }

  public async delete(id: string) {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }
}
