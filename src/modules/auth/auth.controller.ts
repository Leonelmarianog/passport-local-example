import { Application, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

export class AuthController {
  private readonly path = '/auth';

  constructor(
    private readonly authService: AuthService,
    private readonly requestTransformerMiddleware: any,
    private readonly requestValidatorMiddleware: any,
    private readonly authenticateMiddleware: any
  ) {}

  public initializeRoutes = (app: Application) => {
    app.post(
      `${this.path}/register`,
      this.requestTransformerMiddleware(RegisterDto),
      this.requestValidatorMiddleware({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
      this.register
    );
    app.post(
      `${this.path}/login`,
      this.requestTransformerMiddleware(LoginDto),
      this.requestValidatorMiddleware({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
      this.authenticateMiddleware,
      this.login
    );
    app.get(`${this.path}/logout`, this.logout);
  };

  public register = async (req: Request, res: Response) => {
    const registerData: RegisterDto = req.body;
    const user = await this.authService.register(registerData);
    res.send(user);
  };

  public login = (req: Request, res: Response) => {
    res.json({ message: 'Successfully logged in!.' });
  };

  public logout = (req: Request, res: Response) => {
    req.logOut();
    res.json({ message: 'Successfully logged out.' });
  };
}
