import { successCode } from 'src/config/response';
import { Injectable } from '@nestjs/common';
import { PrismaClient, binh_luan } from '@prisma/client';

@Injectable()
export class CommentService {
  prisma = new PrismaClient();

  async getComment(hinhAnhId: number): Promise<binh_luan[]> {
    const data = await this.prisma.binh_luan.findMany({
      where: { hinh_anh_id: hinhAnhId },
      include: {
        nguoi_dung: {
          select: {
            ho_ten: true,
            anh_dai_dien: true,
          },
        },
      },
    });
    return data;
  }

  async postComment(body: any, res: Response) {
    const newComment = { ...body, ngay_binh_luan: new Date() };
    await this.prisma.binh_luan.create({ data: newComment });
    return successCode(res, '', 'Bình luận thành công');
  }
}
