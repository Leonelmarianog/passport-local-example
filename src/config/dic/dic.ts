import DIContainer, { object, get, factory } from 'rsdi';
import { Factory } from 'rsdi/definitions/FactoryDefinition';
import { getRepository } from 'typeorm';
import {
  UserController,
  UserService,
  UserRepository,
} from '../../module/user/user.module';
/* import { AuthController, AuthService } from '../../modules/auth/auth.module'; */
import {
  /*   authenticateMiddleware,
  isAuthenticatedMiddleware, */
  requestValidatorMiddleware,
  requestTransformerMiddleware,
} from '../../common/middleware';

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
    UserRepository: Object(UserRepository).construct(),
    UserService: object(UserService).construct(get('UserRepository')),
    UserController: object(UserController).construct(
      get('UserService'),
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
