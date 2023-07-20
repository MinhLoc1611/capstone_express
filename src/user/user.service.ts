import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { successCode } from 'src/config/response';
import { userUpdateType } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();

  async getUserById(id: number, res: Response) {
    try {
      const data = await this.prisma.nguoi_dung.findFirst({
        where: { nguoi_dung_id: id },
      });
      return successCode(res, data, 'Lấy thông tin thành công');
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  async uploadAvatar(file: Express.Multer.File, id: number, res: Response) {
    try {
      const getUserById = await this.prisma.nguoi_dung.findFirst({
        where: { nguoi_dung_id: id },
      });
      if (getUserById) {
        getUserById.anh_dai_dien = file.filename;

        await this.prisma.nguoi_dung.update({
          data: getUserById,
          where: { nguoi_dung_id: id },
        });
        return successCode(res, '', 'Upload avatar thành công');
      }
      throw new HttpException('Không tìm thấy thông tin người dùng', 400);
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  async updateUser(id: number, body: userUpdateType, res: Response) {
    try {
      const { email, ho_ten, tuoi } = body;
      const getUser = await this.prisma.nguoi_dung.findFirst({
        where: { nguoi_dung_id: id },
      });
      if (getUser) {
        const userUpdate = {
          ...getUser,
          email,
          ho_ten,
          tuoi,
        };
        await this.prisma.nguoi_dung.update({
          where: { nguoi_dung_id: id },
          data: userUpdate,
        });
        return successCode(res, '', 'update thành công');
      } else {
        throw new HttpException('Không tìm thấy thông tin người dùng', 400);
      }
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }
}
