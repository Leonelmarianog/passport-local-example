import { Application, NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../../common/enums';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../service/user.service';

export class UserController {
  private readonly path: any = '/users';

  constructor(
    private readonly userService: UserService,
    private readonly requestTransformerMiddleware: any,
    private readonly requestValidatorMiddleware: any
  ) {}

  public initializeRoutes(app: Application) {
    app.get(`${this.path}`, this.findAll);
    app.get(`${this.path}/:id`, this.findOne);
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
    app.delete(`${this.path}/:id`, this.delete);
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

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const newUser = await this.userService.create(userData);
      res.send(newUser);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: UpdateUserDto = req.body;
      const updatedUser = await this.userService.update(userId, userData);
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