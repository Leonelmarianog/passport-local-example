import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import { configureDI } from './config/dic/dic';
import { configureSessions } from './config/sessions/sessions';
import { connectToDatabase } from './config/database/typeorm';
import { bootstrap as initializeUsersModule } from './module/user/user.module';
import { errorHandlerMiddleware } from './common/middleware/error-handler.middleware';

dotenv.config();

const bootstrap = async () => {
  await connectToDatabase();

  const app = express();
  const container = configureDI();
  const sessionConfig = configureSessions();
  const PORT = process.env.PORT ? +process.env.PORT : 3000;

  app.use(morgan('tiny'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(session(sessionConfig));

  initializeUsersModule(app, container);

  app.use(errorHandlerMiddleware);

  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
};

bootstrap();
