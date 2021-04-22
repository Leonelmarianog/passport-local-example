import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { SecureUserDto } from '../dto/secure-user.dto';
import { User } from '../entity/user.entity';

export const mapRequestToEntity = (request: CreateUserDto | UpdateUserDto) => {
  const user = new User();

  user.firstName = request.firstName;
  user.lastName = request.lastName;
  user.email = request.email;
  user.password = request.password;

  return user;
};

export const mapEntityToResponse = (entity: User) => {
  const secureUserDto = new SecureUserDto();

  secureUserDto.id = entity.id;
  secureUserDto.firstName = entity.firstName;
  secureUserDto.lastName = entity.lastName;
  secureUserDto.email = entity.email;
  secureUserDto.isAdmin = entity.isAdmin;

  return secureUserDto;
};
