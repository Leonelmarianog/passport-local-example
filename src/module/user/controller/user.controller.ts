import { Application, NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../../common/enums';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { mapRequestToEntity } from '../mapper/user.mapper';
import { UserService } from '../service/user.service';
import { User } from '../user.module';

interface RequestWithUser extends Request {
  user: User;
}

export class UserController {
  private readonly BASE_ROUTE: string = '/users';

  constructor(
    private readonly userService: UserService,
    private readonly requestTransformerMiddleware: any,
    private readonly requestValidatorMiddleware: any,
    private readonly isAuthenticatedMiddleware: any
  ) {}

  public initializeRoutes(app: Application) {
    app.get(`${this.BASE_ROUTE}`, this.findAll);
    app.get(
      `${this.BASE_ROUTE}/self`,
      this.isAuthenticatedMiddleware,
      this.findSelf
    );
    app.get(`${this.BASE_ROUTE}/:id`, this.findOne);
    app.post(
      `${this.BASE_ROUTE}`,
      this.requestTransformerMiddleware(CreateUserDto),
      this.requestValidatorMiddleware({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
      this.create
    );
    app.patch(
      `${this.BASE_ROUTE}/:id`,
      this.requestTransformerMiddleware(UpdateUserDto),
      this.requestValidatorMiddleware({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
      this.update
    );
    app.delete(`${this.BASE_ROUTE}/:id`, this.delete);
  }

  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.findAll();
      res.send(users);
    } catch (error) {
      next(error);
    }
  };

  public findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const user = await this.userService.findOne(userId);
      res.send(user);
    } catch (error) {
      next(error);
    }
  };

  public findSelf = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const self = req.user;
      res.send(self);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const user = mapRequestToEntity(userData);
      const newUser = await this.userService.create(user);
      res.send(newUser);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: UpdateUserDto = req.body;
      const user = mapRequestToEntity(userData);
      const updatedUser = await this.userService.update(userId, user);
      res.send(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      await this.userService.delete(userId);
      res.sendStatus(HttpStatus.OK);
    } catch (error) {
      next(error);
    }
  };
}
