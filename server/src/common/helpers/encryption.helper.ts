import bcrypt from 'bcrypt';

export const encryptPassword = (password: string) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
};

export const comparePasswords = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword);
};
