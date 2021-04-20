import DIContainer, { object, get, factory } from 'rsdi';
import { Factory } from 'rsdi/definitions/FactoryDefinition';
import { getCustomRepository } from 'typeorm';
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

const addCommonDefinitions = (container: DIContainer) => {
  container.addDefinitions({
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
