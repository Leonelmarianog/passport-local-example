import DIContainer, { object, get, factory, IDIContainer } from 'rsdi';
import { Factory } from 'rsdi/definitions/FactoryDefinition';
import { getCustomRepository, getRepository } from 'typeorm';
import expressSession from 'express-session';
import { TypeormStore } from 'connect-typeorm';
import {
  IStrategyOptions,
  Strategy as LocalStrategy,
  VerifyFunction,
} from 'passport-local';
import {
  UserController,
  UserService,
  UserRepository,
  User,
} from '../../module/user/user.module';
import {
  requestValidatorMiddleware,
  requestTransformerMiddleware,
} from '../../common/middleware';
import { comparePasswords } from '../../common/helpers/encryption.helper';
import { Session } from './common/entity';

const configurePassportLocalStrategy: Factory = () => {
  const verifyCallback: VerifyFunction = async (email, password, done) => {
    try {
      const userRepository = getCustomRepository(UserRepository);
      const user = await userRepository.findOne(email);

      // No errors, No user
      if (!user) {
        return done(null, false);
      }

      const isValid = comparePasswords(password, user.password);

      // No errors, No user with given credentials
      if (!isValid) {
        return done(null, false);
      }

      // No errors, User with given credentials found on database
      return done(null, user);
    } catch (error) {
      // Something failed during authentication
      done(error);
    }
  };

  const customFields: IStrategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
  };

  return new LocalStrategy(customFields, verifyCallback);
};

const configurePassportSerializer: Factory = () => {
  return (user: User, done: (err: any, id?: number) => void) => {
    // Save only the id of the user on the session
    done(undefined, user.id);
  };
};

const configurePassportDeserializer: Factory = () => {
  return async (
    userId: string,
    done: (err: any, user?: false | User | null | undefined) => void
  ) => {
    try {
      const userRepository = getCustomRepository(UserRepository);
      const user = await userRepository.findOne(userId);
      // No error, User with given id found in database
      done(null, user);
    } catch (error) {
      // Something failed during user retrieval from database
      done(error);
    }
  };
};

const configureSessionStore: Factory = () => {
  const sessionRepository = getRepository(Session);
  return new TypeormStore({
    cleanupLimit: 2,
    // eslint-disable-next-line no-console
    onError: (store, error) => console.log(error),
  }).connect(sessionRepository);
};

const configureSession: Factory = (container: IDIContainer) => {
  const sessionStore: TypeormStore = container.get('SessionStore');
  return expressSession({
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

const addCommonDefinitions = (container: DIContainer) => {
  container.addDefinitions({
    SessionStore: factory(configureSessionStore),
    Session: factory(configureSession),
    LocalStrategy: factory(configurePassportLocalStrategy),
    PassportSerializer: factory(configurePassportSerializer),
    PassportDeserializer: factory(configurePassportDeserializer),
  });
};

const addRouteScopedMiddlewareDefinitions = (container: DIContainer) => {
  container.addDefinitions({
    RequestValidatorMiddleware: requestValidatorMiddleware,
    RequestTransformerMiddleware: requestTransformerMiddleware,
  });
};

const configureUserRepository: Factory = () => {
  const userRepository = getCustomRepository(UserRepository);
  return userRepository;
};

const addUserModuleDefinitions = (container: DIContainer) => {
  container.addDefinitions({
    UserRepository: factory(configureUserRepository),
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
  addCommonDefinitions(container);
  addRouteScopedMiddlewareDefinitions(container);
  addUserModuleDefinitions(container);
  return container;
};
