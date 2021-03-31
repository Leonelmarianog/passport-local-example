import DIContainer, { object, get, factory } from 'rsdi';
import { Factory } from 'rsdi/definitions/FactoryDefinition';
import session from 'express-session';
import { getRepository } from 'typeorm';
import { TypeormStore } from 'connect-typeorm';
import {
  UsersController,
  UsersService,
  User,
} from '../modules/users/users.module';
import { AuthController, AuthService } from '../modules/auth/auth.module';
import { Session } from '../entities/session.entity';

const configSessionStore: Factory = () => {
  const sessionRepository = getRepository(Session);
  return new TypeormStore({
    cleanupLimit: 2,
    // eslint-disable-next-line no-console
    onError: (store, error) => console.log(error),
  }).connect(sessionRepository);
};

const configSession: Factory = (container) => {
  const sessionStore: TypeormStore = container.get('SessionStore');
  return session({
    secret: process.env.SESSION_SECRET
      ? process.env.SESSION_SECRET
      : 'Set a secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  });
};

const configUsersRepository: Factory = (container) => {
  return getRepository(User);
};

const addCommonDefinitions = (container: DIContainer) => {
  container.addDefinitions({
    SessionStore: factory(configSessionStore),
    Session: factory(configSession),
  });
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
  addCommonDefinitions(container);
  addUsersModuleDefinitions(container);
  addAuthModuleDefinitions(container);
  return container;
};
