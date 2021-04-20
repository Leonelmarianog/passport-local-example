import { CreateUserDto, UpdateUserDto, User } from '../user.module';

export const mapRequestToEntity = (request: CreateUserDto | UpdateUserDto) => {
  const user = new User();

  user.firstName = request.firstName;
  user.lastName = request.lastName;
  user.email = request.email;
  user.password = request.password;

  return user;
};
