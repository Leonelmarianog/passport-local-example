import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import { configureDIC } from './config/dic/dic';
import { connectToDatabase } from './config/database/typeorm';
import { bootstrap as initializeUsersModule } from './module/user/user.module';
import { bootstrap as initializeAuthModule } from './module/auth/auth.module';
import { errorHandlerMiddleware } from './common/middleware/error-handler.middleware';

dotenv.config();

const bootstrap = async () => {
  await connectToDatabase();

  const app = express();
  const container = configureDIC();
  const PORT = process.env.PORT || 3000;

  app.use(morgan('tiny'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(container.get('Session'));
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(container.get('LocalStrategy'));
  passport.serializeUser(container.get('PassportSerializer'));
  passport.deserializeUser(container.get('PassportDeserializer'));

  initializeUsersModule(app, container);
  initializeAuthModule(app, container);

  app.use(errorHandlerMiddleware);

  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
};

bootstrap();
