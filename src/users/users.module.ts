import { Application } from 'express';
import DIContainer from 'rsdi';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const bootstrap = (app: Application, container: DIContainer) => {
  const usersController: UsersController = container.get('UsersController');
  usersController.initializeRoutes(app);
};

export { UsersController, UsersService, bootstrap };
