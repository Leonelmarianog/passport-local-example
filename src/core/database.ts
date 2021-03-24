import dotenv from 'dotenv';
import { join } from 'path';
import { ConnectionOptions, createConnection } from 'typeorm';

dotenv.config();

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [join(__dirname, '/../modules/**/*.entity.ts')],
  synchronize: true,
};

export const connectToDatabase = async () => {
  try {
    await createConnection(config);
    // eslint-disable-next-line no-console
    console.log('Connection to Postgres DB established');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
