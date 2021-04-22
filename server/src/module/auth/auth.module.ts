import { Application } from 'express';
import DIContainer from 'rsdi';
import { AuthController } from './controller/auth.controller';
import { LoginDto } from './dto/login.dto';

const bootstrap = (app: Application, container: DIContainer) => {
  const authController: AuthController = container.get('AuthController');
  authController.initializeRoutes(app);
};

export { AuthController, LoginDto, bootstrap };
