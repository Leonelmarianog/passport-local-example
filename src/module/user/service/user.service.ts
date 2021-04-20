import { UserRepository } from '../repository/user.repository';
import { User } from '../user.module';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findAll() {
    return this.userRepository.findAll();
  }

  public async findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  public async create(user: User) {
    user.setPassword(user.password!);
    return this.userRepository.create(user);
  }

  public async update(id: string, user: User) {
    if (user.password) {
      user.setPassword(user.password);
    }

    return this.userRepository.update(id, user);
  }

  public async delete(id: string) {
    return this.userRepository.delete(id);
  }
}
