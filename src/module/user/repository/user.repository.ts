import { AbstractRepository, EntityRepository } from 'typeorm';
import { NotFoundException } from '../../../common/exceptions';
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

  public async findOneByEmail(email: string) {
    const user = await this.repository.findOne({ email });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  public async create(user: User) {
    const newUser = this.repository.create(user);
    return this.repository.save(newUser);
  }

  public async update(id: string, user: User) {
    const updatedUser = await this.repository.preload({
      id: Number(id),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
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
