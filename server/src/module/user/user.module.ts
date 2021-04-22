import { Application } from 'express';
import DIContainer from 'rsdi';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserRepository } from './repository/user.repository';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const bootstrap = (app: Application, container: DIContainer) => {
  const userController: UserController = container.get('UserController');
  userController.initializeRoutes(app);
};

export {
  UserController,
  UserService,
  UserRepository,
  User,
  CreateUserDto,
  UpdateUserDto,
  bootstrap,
};
