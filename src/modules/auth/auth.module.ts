import { Application } from 'express';
import DIContainer from 'rsdi';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const bootstrap = (app: Application, container: DIContainer) => {
  const authController: AuthController = container.get('AuthController');
  authController.initializeRoutes(app);
};

export { AuthController, AuthService, bootstrap };
