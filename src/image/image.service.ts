import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ImageService {
  prisma = new PrismaClient();

  async getImg() {
    const data = await this.prisma.hinh_anh.findMany();
    return data;
  }

  async getImgByName(ten: string) {
    const data = await this.prisma.hinh_anh.findMany({
      where: {
        ten_hinh: {
          startsWith: `%${ten}%`,
        },
      },
    });
    return data;
  }
}
