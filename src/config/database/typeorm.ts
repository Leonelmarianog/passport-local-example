import { ConnectionOptions, createConnection } from 'typeorm';

export const connectToDatabase = async (
  connectionOptions?: ConnectionOptions
) => {
  try {
    if (connectionOptions) {
      await createConnection(connectionOptions);
    } else {
      await createConnection();
    }
    // eslint-disable-next-line no-console
    console.log('Connection to DB established.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
