import DIContainer, { object, get, factory } from 'rsdi';
import { UsersController, UsersService } from '../modules/users/users.module';
import { getRepository } from 'typeorm';
import { User } from '../modules/users/entities/user.entity';

const configUsersRepository = () => {
  return getRepository(User);
};

const addUsersModuleDefinitions = (container: DIContainer) => {
  container.addDefinitions({
    UsersRepository: factory(configUsersRepository),
    UsersService: object(UsersService).construct(get('UsersRepository')),
    UsersController: object(UsersController).construct(get('UsersService')),
  });
};

export const configureDI = () => {
  const container = new DIContainer();
  addUsersModuleDefinitions(container);
  return container;
};
