import { join } from 'path';
import { createConnection } from 'typeorm';

export const connectToDatabase = async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [join(__dirname + '/../../**/*.ts')],
      synchronize: process.env.NODE_ENV === 'development' ? true : false,
    });
    // eslint-disable-next-line no-console
    console.log('Connection to DB established.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
