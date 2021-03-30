import { Application, NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { requestTransformerMiddleware } from '../../middleware/request-transformer.middleware';
import { requestValidatorMiddleware } from '../../middleware/request-validator.middleware';
import { User } from '../users/users.module';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

export class AuthController {
  private readonly path = '/auth';

  constructor(private readonly authService: AuthService) {}

  public initializeRoutes = (app: Application) => {
    app.post(
      `${this.path}/register`,
      requestTransformerMiddleware(RegisterDto),
      requestValidatorMiddleware({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
      this.register
    );
    app.post(
      `${this.path}/login`,
      requestTransformerMiddleware(LoginDto),
      requestValidatorMiddleware({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
      this.login
    );
    app.get(`${this.path}/logout`, this.logout);
  };

  public register = async (req: Request, res: Response) => {
    const registerData: RegisterDto = req.body;
    const user = await this.authService.register(registerData);
    res.send(user);
  };

  public login = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (error, user: User, info) => {
      if (error) {
        return next(error);
      }

      if (!user) {
        return res.json({ message: 'Invalid email or password.' });
      }

      req.logIn(user, (error) => {
        if (error) {
          return next(error);
        }

        return res.json({
          message: `Welcome ${user.firstName} ${user.lastName}!.`,
        });
      });
    })(req, res, next);
  };

  public logout = (req: Request, res: Response, next: NextFunction) => {
    req.logOut();
    res.json({ message: 'Successfully logged out.' });
  };
}
