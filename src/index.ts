import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { configureDI } from './config/dic';
import { bootstrap as InitializeUsersModule } from './users/users.module';
import { errorHandler } from './common/middleware/errorHandler';

dotenv.config();

const bootstrap = () => {
  const app = express();
  const container = configureDI();
  const PORT = process.env.PORT ? +process.env.PORT : 3000;

  app.use(morgan('tiny'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  InitializeUsersModule(app, container);

  app.use(errorHandler);

  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
};

bootstrap();
