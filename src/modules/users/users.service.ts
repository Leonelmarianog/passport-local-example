import { Repository } from 'typeorm';
import { NotFoundException } from '../../common/exceptions/NotFoundException';
import { User } from './entities/user.entity';

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

  public async create(userDto: any) {
    const user = this.usersRepository.create(userDto);
    return this.usersRepository.save(user);
  }

  public async update(id: string, userDto: any) {
    const user = await this.usersRepository.preload({
      id: +id,
      ...userDto,
    });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return this.usersRepository.save(user);
  }

  public async delete(id: string) {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }
}
