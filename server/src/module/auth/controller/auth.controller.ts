import { Application, NextFunction, Request, Response } from 'express';
import { LoginDto } from '../dto/login.dto';
import { CreateUserDto, UserService } from '../../user/user.module';
import { mapRequestToEntity } from '../../user/mapper/user.mapper';
import { HttpStatus } from '../../../common/enums';

export class AuthController {
  private readonly BASE_ROUTE = '/auth';

  constructor(
    private readonly userService: UserService,
    private readonly requestTransformerMiddleware: any,
    private readonly requestValidatorMiddleware: any,
    private readonly authenticateMiddleware: any,
    private readonly isAuthenticatedMiddleware: any
  ) {}

  public initializeRoutes = (app: Application) => {
    app.post(
      `${this.BASE_ROUTE}/register`,
      this.requestTransformerMiddleware(CreateUserDto),
      this.requestValidatorMiddleware({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
      this.register
    );
    app.post(
      `${this.BASE_ROUTE}/login`,
      this.requestTransformerMiddleware(LoginDto),
      this.requestValidatorMiddleware({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
      this.authenticateMiddleware,
      this.login
    );
    app.get(
      `${this.BASE_ROUTE}/logout`,
      this.isAuthenticatedMiddleware,
      this.logout
    );
  };

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const user = mapRequestToEntity(userData);
      await this.userService.create(user);
      res.json({
        statusCode: HttpStatus.OK,
        message: 'Successfully registered',
      });
    } catch (error) {
      next(error);
    }
  };

  public login = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({
        statusCode: HttpStatus.OK,
        message: 'Successfully logged in',
      });
    } catch (error) {
      next(error);
    }
  };

  public logout = (req: Request, res: Response, next: NextFunction) => {
    try {
      req.logOut();
      res.json({
        statusCode: HttpStatus.OK,
        message: 'Successfully logged out',
      });
    } catch (error) {
      next(error);
    }
  };
}
