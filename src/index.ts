import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { configureDI } from './core/dic';
import { connectToDatabase } from './core/database';
import { bootstrap as InitializeUsersModule } from './modules/users/users.module';
import { errorHandlerMiddleware } from './middleware/error-handler.middleware';

dotenv.config();

const bootstrap = async () => {
  await connectToDatabase();

  const app = express();
  const container = configureDI();
  const PORT = process.env.PORT ? +process.env.PORT : 3000;

  app.use(morgan('tiny'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  InitializeUsersModule(app, container);

  app.use(errorHandlerMiddleware);

  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
};

bootstrap();
