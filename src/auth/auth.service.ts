import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { failCode, successCode } from 'src/config/response';
import * as bcrypt from 'bcrypt';
import { userLoginType, userRegisterType } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  prisma = new PrismaClient();

  async login(userLogin: userLoginType, res: Response) {
    const { email, matkhau } = userLogin;
    const checkUser = await this.prisma.nguoi_dung.findFirst({
      where: { email: email },
    });
    if (checkUser) {
      if (
        bcrypt.compareSync(matkhau, checkUser.matkhau) ||
        matkhau === checkUser.matkhau
      ) {
        const loginUser = { ...checkUser, matkhau: '' };
        const token = await this.jwtService.signAsync(loginUser, {
          secret: this.configService.get('KEY'),
          expiresIn: '1d',
        });
        return successCode(res, token, 'Đăng nhập thành công');
      } else {
        return failCode(res, 'mật khẩu không đúng!');
      }
    } else {
      return failCode(res, 'email không đúng!');
    }
  }

  async register(userRegister: userRegisterType, res: Response) {
    const { matkhau } = userRegister;
    const checkEmail = await this.prisma.nguoi_dung.findFirst({
      where: { email: userRegister.email },
    });
    if (checkEmail) {
      return failCode(res, 'email đã tồn tại!');
    } else {
      userRegister.matkhau = bcrypt.hashSync(matkhau, 10);
      await this.prisma.nguoi_dung.create({ data: userRegister });
      return successCode(res, '', 'Đăng ký thành công');
    }
  }
}
