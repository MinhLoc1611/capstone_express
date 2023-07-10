import { successCode } from 'src/config/response';
import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { postCommentType } from './dto/comment.dto';

@Injectable()
export class CommentService {
  prisma = new PrismaClient();

  async getComment(hinhAnhId: number, res: Response) {
    try {
      const checkHinhAnh = await this.prisma.hinh_anh.findFirst({
        where: { hinh_anh_id: hinhAnhId },
      });
      if (checkHinhAnh) {
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
        return successCode(res, data, 'Lấy thông tin bình luận thành công');
      } else {
        throw new HttpException('Không tìm thấy thông tin hình ảnh', 400);
      }
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  async postComment(body: postCommentType, res: Response) {
    try {
      const checkHinhAnh = await this.prisma.hinh_anh.findFirst({
        where: { hinh_anh_id: body.hinh_anh_id },
      });
      if (checkHinhAnh) {
        const newComment = { ...body, ngay_binh_luan: new Date() };
        await this.prisma.binh_luan.create({ data: newComment });
        return successCode(res, '', 'Bình luận thành công');
      } else {
        throw new HttpException('Không tìm thấy thông tin hình ảnh', 400);
      }
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }
}
