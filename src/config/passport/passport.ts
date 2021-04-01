import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { getRepository } from 'typeorm';
import { User } from '../../modules/users/users.module';
import { validatePassword } from '../../utils/passwordUtils';

export const configurePassport = () => {
  const verifyCallback = async (email: string, password: string, done: any) => {
    try {
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ email });

      if (!user) {
        return done(null, false);
      }

      const isValid = validatePassword(password, user.hash, user.salt);

      if (!isValid) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      done(error);
    }
  };

  const customFields = {
    usernameField: 'email',
    passwordField: 'password',
  };

  const localStrategy = new LocalStrategy(customFields, verifyCallback);

  passport.use(localStrategy);

  passport.serializeUser((user, done) => {
    const userInstance = user as User;
    done(undefined, userInstance.id);
  });

  passport.deserializeUser(async (userId: string, done) => {
    try {
      const userRepository = getRepository(User);
      const user = await userRepository.findOne(userId);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
