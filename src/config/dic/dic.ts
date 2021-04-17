import DIContainer, { object, get, factory } from 'rsdi';
import { Factory } from 'rsdi/definitions/FactoryDefinition';
import { getRepository } from 'typeorm';
import {
  UsersController,
  UsersService,
  User,
} from '../../modules/users/users.module';
/* import { AuthController, AuthService } from '../../modules/auth/auth.module'; */
import {
  /*   authenticateMiddleware,
  isAuthenticatedMiddleware, */
  requestValidatorMiddleware,
  requestTransformerMiddleware,
} from '../../common/middleware';

const configUsersRepository: Factory = () => {
  return getRepository(User);
};

const addRouteScopedMiddlewareDefinitions = (container: DIContainer) => {
  container.addDefinitions({
    /*     AuthenticateMiddleware: authenticateMiddleware,
    IsAuthenticatedMiddleware: isAuthenticatedMiddleware, */
    RequestValidatorMiddleware: requestValidatorMiddleware,
    RequestTransformerMiddleware: requestTransformerMiddleware,
  });
};

/* const addAuthModuleDefinitions = (container: DIContainer) => {
  container.addDefinitions({
    AuthService: object(AuthService).construct(get('UsersService')),
    AuthController: object(AuthController).construct(
      get('AuthService'),
      get('RequestTransformerMiddleware'),
      get('RequestValidatorMiddleware'),
      get('AuthenticateMiddleware')
    ),
  });
}; */

const addUsersModuleDefinitions = (container: DIContainer) => {
  container.addDefinitions({
    UsersRepository: factory(configUsersRepository),
    UsersService: object(UsersService).construct(get('UsersRepository')),
    UsersController: object(UsersController).construct(
      get('UsersService'),
      get('RequestTransformerMiddleware'),
      get('RequestValidatorMiddleware')
    ),
  });
};

export const configureDI = () => {
  const container = new DIContainer();
  addRouteScopedMiddlewareDefinitions(container);
  addUsersModuleDefinitions(container);
  return container;
};
