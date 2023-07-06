import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { successCode } from 'src/config/response';

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();

  getUserByToken(token: string) {
    const user = this.jwtService.decode(token.slice(7, token.length));
    return user;
  }

  async uploadAvatar(file: Express.Multer.File, userId: number, res: Response) {
    try {
      const getUserById = await this.prisma.nguoi_dung.findFirst({
        where: { nguoi_dung_id: userId },
      });
      getUserById.anh_dai_dien = file.filename;
      await this.prisma.nguoi_dung.update({
        data: getUserById,
        where: { nguoi_dung_id: userId },
      });
      return successCode(res, '', 'upload ảnh thành công');
    } catch {
      throw new HttpException('Lỗi BE', 500);
    }
  }

  async updateUser(id: number, body: any, res: Response) {
    const { email, ho_ten, tuoi } = body;
    const getUser = await this.prisma.nguoi_dung.findFirst({
      where: { nguoi_dung_id: id },
    });
    const userUpdate = { ...getUser, email, ho_ten, tuoi };
    await this.prisma.nguoi_dung.update({
      where: { nguoi_dung_id: id },
      data: userUpdate,
    });
    return successCode(res, '', 'update thành công');
  }
}
