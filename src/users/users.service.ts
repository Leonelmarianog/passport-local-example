import { User } from './interfaces/user.interface';

export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Leonel Gauna',
      password: '123',
    },
    {
      id: 2,
      name: 'Anuag Lenoel',
      password: '321',
    },
  ];

  public findAll() {
    return this.users;
  }

  public findOne(id: string) {
    const user = this.users.find((user) => user.id === +id);

    if (!user) {
      throw new Error(`User #${id} not found`);
    }

    return user;
  }

  public create(userDto: any) {
    const lastUserId = this.users[this.users.length - 1].id;
    this.users.push({ id: lastUserId + 1, ...userDto });
    return this.users[this.users.length - 1];
  }

  public update(id: string, userDto: any) {
    const userToUpdateIndex = this.users.findIndex((user) => user.id === +id);

    if (userToUpdateIndex === -1) {
      throw new Error(`User #${id} not found`);
    }

    this.users[userToUpdateIndex] = {
      ...this.users[userToUpdateIndex],
      ...userDto,
    };

    return this.users.find((users) => users.id === +id);
  }

  public delete(id: string) {
    const userToDeleteIndex = this.users.findIndex((user) => user.id === +id);

    if (userToDeleteIndex === -1) {
      throw new Error(`User #${id} not found`);
    }

    this.users.splice(userToDeleteIndex, 1);

    return true;
  }
}
