import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import passport from 'passport';
import { configureDI } from './config/dic/dic';
import { configureSessions } from './config/sessions/sessions';
import { configurePassport } from './config/passport/passport';
import { connectToDatabase } from './config/database/typeorm';
import { bootstrap as initializeUsersModule } from './modules/users/users.module';
import { bootstrap as initializeAuthModule } from './modules/auth/auth.module';
import { errorHandlerMiddleware } from './common/middleware/error-handler.middleware';

dotenv.config();

const bootstrap = async () => {
  await connectToDatabase();

  const app = express();
  const container = configureDI();
  const sessionConfig = configureSessions();
  const PORT = process.env.PORT ? +process.env.PORT : 3000;

  configurePassport();

  app.use(morgan('tiny'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(session(sessionConfig));
  app.use(passport.initialize());
  app.use(passport.session());

  initializeUsersModule(app, container);
  initializeAuthModule(app, container);

  app.use(errorHandlerMiddleware);

  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
};

bootstrap();
