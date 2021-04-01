import { getRepository } from 'typeorm';
import { TypeormStore } from 'connect-typeorm';
import { Session } from './entities/session.entity';

export const configureSessions = () => {
  const sessionRepository = getRepository(Session);
  const sessionStore = new TypeormStore({
    cleanupLimit: 2,
    // eslint-disable-next-line no-console
    onError: (store, error) => console.log(error),
  }).connect(sessionRepository);

  return {
    secret: process.env.SESSION_SECRET
      ? process.env.SESSION_SECRET
      : 'Set a secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  };
};
