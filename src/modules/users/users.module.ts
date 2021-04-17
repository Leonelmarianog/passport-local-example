import { Application } from 'express';
import DIContainer from 'rsdi';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const bootstrap = (app: Application, container: DIContainer) => {
  const usersController: UsersController = container.get('UsersController');
  usersController.initializeRoutes(app);
};

export {
  UsersController,
  UsersService,
  User,
  CreateUserDto,
  UpdateUserDto,
  bootstrap,
};
