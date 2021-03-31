import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import { configureDI } from './core/dic';
import { connectToDatabase } from './core/database/typeorm';
import { bootstrap as InitializeUsersModule } from './modules/users/users.module';
import { bootstrap as InitializeAuthModule } from './modules/auth/auth.module';
import { errorHandlerMiddleware } from './middleware/error-handler.middleware';
import './core/passport';

dotenv.config();

const bootstrap = async () => {
  await connectToDatabase();

  const app = express();
  const container = configureDI();
  const PORT = process.env.PORT ? +process.env.PORT : 3000;

  app.use(morgan('tiny'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(container.get('Session'));
  app.use(passport.initialize());
  app.use(passport.session());

  InitializeUsersModule(app, container);
  InitializeAuthModule(app, container);

  app.use(errorHandlerMiddleware);

  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
};

bootstrap();
