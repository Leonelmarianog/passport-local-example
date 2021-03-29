import DIContainer, { object, get, factory } from 'rsdi';
import { UsersController, UsersService } from '../modules/users/users.module';
import { getRepository } from 'typeorm';
import { User } from '../modules/users/entities/user.entity';
import session from 'express-session';
import { TypeormStore } from 'connect-typeorm';
import { Session } from '../entities/session.entity';
import { AuthService } from '../modules/auth/auth.service';
import { AuthController } from '../modules/auth/auth.controller';

const configSession = () => {
  const userRepository = getRepository(Session);
  const sessionStore = new TypeormStore({
    cleanupLimit: 2,
    // eslint-disable-next-line no-console
    onError: (store, error) => console.log(error),
  }).connect(userRepository);

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

const configUsersRepository = () => {
  return getRepository(User);
};

const addCommonDefinitions = (container: DIContainer) => {
  container.addDefinitions({
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
