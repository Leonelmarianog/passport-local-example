import { Application, NextFunction, Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

export class UsersController {
  private readonly path: any = '/users';

  constructor(
    private readonly usersService: UsersService,
    private readonly isAuthenticatedMiddleware: any,
    private readonly requestTransformerMiddleware: any,
    private readonly requestValidatorMiddleware: any
  ) {}

  public initializeRoutes(app: Application) {
    app.get(`${this.path}`, this.isAuthenticatedMiddleware, this.findAll);
    app.get(`${this.path}/:id`, this.isAuthenticatedMiddleware, this.findOne);
    app.post(
      `${this.path}`,
      this.requestTransformerMiddleware(CreateUserDto),
      this.requestValidatorMiddleware({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
      this.create
    );
    app.patch(
      `${this.path}/:id`,
      this.requestTransformerMiddleware(CreateUserDto),
      this.requestValidatorMiddleware({
        skipMissingProperties: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
      this.update
    );
    app.delete(`${this.path}/:id`, this.isAuthenticatedMiddleware, this.delete);
  }

  public findAll = async (req: Request, res: Response) => {
    const users = await this.usersService.findAll();
    res.send(users);
  };

  public findOne = async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.id;

    try {
      const user = await this.usersService.findOne(userId);
      res.send(user);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response) => {
    const userData: CreateUserDto = req.body;
    const newUser = await this.usersService.create(userData);
    res.send(newUser);
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.id;
    const userData: UpdateUserDto = req.body;

    try {
      const updatedUser = await this.usersService.update(userId, userData);
      res.send(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.id;

    try {
      await this.usersService.delete(userId);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}
