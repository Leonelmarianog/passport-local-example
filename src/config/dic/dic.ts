import DIContainer, { object, get, factory } from 'rsdi';
import { Factory } from 'rsdi/definitions/FactoryDefinition';
import { getRepository } from 'typeorm';
import {
  UsersController,
  UsersService,
  User,
} from '../../modules/users/users.module';
import { AuthController, AuthService } from '../../modules/auth/auth.module';

const configUsersRepository: Factory = () => {
  return getRepository(User);
};

const addAuthModuleDefinitions = (container: DIContainer) => {
  container.addDefinitions({
    AuthService: object(AuthService).construct(get('UsersService')),
    AuthController: object(AuthController).construct(get('AuthService')),
  });
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
  addAuthModuleDefinitions(container);
  return container;
};
