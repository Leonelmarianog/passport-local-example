import { Application, NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../../common/enums';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { mapRequestToEntity, mapEntityToResponse } from '../mapper/user.mapper';
import { UserService } from '../service/user.service';
import { RequestWithUser } from '../../../common/interface/request-with-user.interface';

export class UserController {
  private readonly BASE_ROUTE: string = '/user';

  constructor(
    private readonly userService: UserService,
    private readonly requestTransformerMiddleware: any,
    private readonly requestValidatorMiddleware: any,
    private readonly isAuthenticatedMiddleware: any,
    private readonly isAdminMiddleware: any
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
    app.delete(
      `${this.BASE_ROUTE}/:id`,
      this.isAuthenticatedMiddleware,
      this.isAdminMiddleware,
      this.delete
    );
  }

  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.findAll();
      const secureUsers = users.map((user) => mapEntityToResponse(user));
      res.send(secureUsers);
    } catch (error) {
      next(error);
    }
  };

  public findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const user = await this.userService.findOne(userId);
      const secureUser = mapEntityToResponse(user);
      res.send(secureUser);
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
      const secureUser = mapEntityToResponse(self);
      res.send(secureUser);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const user = mapRequestToEntity(userData);
      const newUser = await this.userService.create(user);
      const secureUser = mapEntityToResponse(newUser);
      res.send(secureUser);
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
      const secureUser = mapEntityToResponse(updatedUser);
      res.send(secureUser);
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
