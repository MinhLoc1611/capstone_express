import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { userLoginType, userRegisterType } from './entities/auth.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() body: userLoginType, @Res() res: Response) {
    return this.authService.login(body, res);
  }

  @Post('/register')
  register(@Body() body: userRegisterType, @Res() res: Response) {
    return this.authService.register(body, res);
  }
}
