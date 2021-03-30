import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { validatePassword } from '../utils/passwordUtils';
import { getRepository } from 'typeorm';
import { User } from '../modules/users/users.module';

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
  done(undefined, user);
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
