import express from 'express';
import dotenv from 'dotenv';
import { configureDI } from './config/dic';
import { bootstrap as InitializeUsersModule } from './users/users.module';

dotenv.config();

const bootstrap = () => {
  const app = express();
  const container = configureDI();
  const PORT = process.env.PORT ? +process.env.PORT : 3000;

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  InitializeUsersModule(app, container);

  app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
};

bootstrap();
