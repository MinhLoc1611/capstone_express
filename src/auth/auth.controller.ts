import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() body, @Res() res) {
    // { email, matkhau }
    return this.authService.login(body, res);
  }

  @Post('/register')
  register(@Body() body, @Res() res) {
    // { email, matkhau, ho_ten, tuoi }
    return this.authService.register(body, res);
  }
}
