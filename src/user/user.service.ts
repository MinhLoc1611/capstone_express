import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { successCode } from 'src/config/response';
import { userUpdateType } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();

  getUserByToken(token: string, res: Response) {
    const user = this.jwtService.decode(token.slice(7, token.length));
    return successCode(res, user, 'Lấy thông tin thành công');
  }

  async updateUser(
    file: Express.Multer.File,
    id: number,
    body: userUpdateType,
    res: Response,
  ) {
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
          tuoi: +tuoi,
          anh_dai_dien: file.filename,
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
