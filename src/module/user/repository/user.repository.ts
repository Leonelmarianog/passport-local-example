import { AbstractRepository, EntityRepository } from 'typeorm';
import { NotFoundException } from '../../../common/exceptions';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entity/user.entity';
import { UserSchema } from '../schema/user.schema';

@EntityRepository(UserSchema)
export class UserRepository extends AbstractRepository<User> {
  public async findAll() {
    return this.repository.find();
  }

  public async findOne(id: string) {
    const user = await this.repository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  public async create(createUserDto: CreateUserDto) {
    const newUser = this.repository.create(createUserDto);
    return this.repository.save(newUser);
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.repository.preload({
      id: Number(id),
      ...updateUserDto,
    });

    if (!updatedUser) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return this.repository.save(updatedUser);
  }

  public async delete(id: string) {
    const existingUser = await this.findOne(id);
    return this.repository.remove(existingUser);
  }
}
