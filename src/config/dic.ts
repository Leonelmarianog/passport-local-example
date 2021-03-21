import DIContainer, { object, get } from 'rsdi';
import { UsersController, UsersService } from '../users/users.module';

const addUsersModuleDefinitions = (container: DIContainer) => {
  container.addDefinitions({
    UsersService: object(UsersService).construct(),
    UsersController: object(UsersController).construct(get('UsersService')),
  });
};

export const configureDI = () => {
  const container = new DIContainer();
  addUsersModuleDefinitions(container);
  return container;
};
