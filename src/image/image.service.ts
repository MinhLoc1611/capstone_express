import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaClient, luu_anh } from '@prisma/client';

import { ImgUploadBodyDto } from './dto/img.dto';

@Injectable()
export class ImageService {
  prisma = new PrismaClient();

  async getImg() {
    try {
      const data = await this.prisma.hinh_anh.findMany();
      return data;
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error; // Rethrow the exception to be handled by NestJS
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
  // GET thông tin ảnh bằng tên.
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
  // GET thông tin ảnh và người tạo ảnh bằng id ảnh.
  async getImgInforById(imgId: string) {
    try {
      if (isNaN(+imgId)) {
        throw new BadRequestException(
          'Invalid image ID. Please provide a valid numeric ID.',
        );
      }

      const data = await this.prisma.hinh_anh.findFirst({
        where: {
          hinh_anh_id: +imgId,
        },
        include: {
          nguoi_dung: true,
        },
      });

      if (data) {
        const { nguoi_dung, ...modifiedData } = data;
        const { email, ho_ten, tuoi, anh_dai_dien } = nguoi_dung;
        return { ...modifiedData, email, ho_ten, tuoi, anh_dai_dien };
      } else {
        throw new NotFoundException('Khong co tai nguyen', {
          cause: new Error(),
          description: 'Tai nguyen khong ton tai, vui long nhap ID khac',
        });
      }
    } catch (error) {
      // Propagate the error and return appropriate HTTP response
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error; // Rethrow the exception to be handled by NestJS
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
  // GET thông tin đã lưu hình này chưa theo id ảnh (dùng để kiểm tra ảnh này đã

  async getImgSaveInforById(imgId: string, userId: string) {
    try {
      const data = await this.prisma.hinh_anh.findFirst({
        where: {
          hinh_anh_id: +imgId,
        },
      });
      if (data) {
        const cloneData = { ...data, isSaved: false };
        const checkSaved = await this.prisma.luu_anh.findFirst({
          where: {
            nguoi_dung_id: +userId,
            hinh_anh_id: +imgId,
          },
        });
        if (checkSaved) {
          cloneData.isSaved = true;

          return cloneData;
        }
        return cloneData;
      } else {
        throw new NotFoundException('Khong co tai nguyen', {
          cause: new Error(),
          description: 'Tai nguyen khong ton tai, vui long nhap ID khac',
        });
      }
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error; // Rethrow the exception to be handled by NestJS
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
  // GET danh sách ảnh đã lưu theo user id.
  async getSavedImgById(userId: string) {
    try {
      const data = await this.prisma.luu_anh.findMany({
        where: {
          nguoi_dung_id: +userId,
        },
        include: {
          hinh_anh: true,
        },
      });
      const modifiedData = data.map((element) => {
        return { ...element.hinh_anh, ngay_luu: element.ngay_luu };
      });
      return modifiedData;
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error; // Rethrow the exception to be handled by NestJS
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
  //  GET danh sách ảnh đã tạo theo user id.
  async getCreatedImgById(userId: string) {
    try {
      const data = await this.prisma.hinh_anh.findMany({
        where: {
          nguoi_dung_id: +userId,
        },
      });
      if (data.length > 0) {
        return data;
      } else {
        throw new NotFoundException('Khong co tai nguyen', {
          cause: new Error(),
          description: 'Tai nguyen khong ton tai, vui long nhap ID khac',
        });
      }
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error; // Rethrow the exception to be handled by NestJS
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
  // DELETE xoá ảnh đã tạo theo id ảnh.
  async deleteImg(imgId: string, userId: string) {
    try {
      const checkImg = await this.prisma.hinh_anh.findFirst({
        where: {
          hinh_anh_id: +imgId,
        },
      });
      if (checkImg) {
        const checkUserId = await this.prisma.nguoi_dung.findFirst({
          where: { nguoi_dung_id: +userId },
        });
        if (checkUserId) {
          const checkImgOwner = await this.prisma.hinh_anh.findFirst({
            where: { nguoi_dung_id: +userId, hinh_anh_id: +imgId },
          });
          if (checkImgOwner) {
            await this.prisma.hinh_anh.delete({
              where: {
                hinh_anh_id: +imgId,
              },
            });

            return { imgId, message: 'Xoa hinh thanh cong' };
          } else {
            throw new ForbiddenException('Not ownership', {
              cause: new Error(),
              description: 'You cannot delete other account img',
            });
          }
        } else {
          throw new NotFoundException('Khong co tai nguyen', {
            cause: new Error(),
            description: 'Tai nguyen khong ton tai, vui long dang nhap ID khac',
          });
        }
      } else {
        throw new NotFoundException('Khong co tai nguyen', {
          cause: new Error(),
          description: 'Tai nguyen khong ton tai, hinh anh khong ton tai',
        });
      }
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error; // Rethrow the exception to be handled by NestJS
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
  // POST thêm một ảnh của user
  async uploadImg(
    userId: string,
    file: Express.Multer.File,
    imgInfor: ImgUploadBodyDto,
  ) {
    try {
      const checkUser = await this.prisma.nguoi_dung.findFirst({
        where: {
          nguoi_dung_id: +userId,
        },
      });
      if (checkUser) {
        const newImg = {
          duong_dan: file.filename,
          nguoi_dung_id: +userId,
          ten_hinh: imgInfor.ten_hinh,
          mo_ta: imgInfor.mo_ta,
        };

        await this.prisma.hinh_anh.create({ data: newImg });
        return newImg;
      } else {
        throw new NotFoundException('User khong ton tai', {
          cause: new Error(),
          description: 'Vui long nhap user ID khac',
        });
      }
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error; // Rethrow the exception to be handled by NestJS
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
  async saveImg(imgId: string, userId: string) {
    try {
      const data: luu_anh = {
        nguoi_dung_id: +userId,
        hinh_anh_id: +imgId,
        ngay_luu: new Date(),
      };
      await this.prisma.luu_anh.create({
        data: data,
      });
      return data;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error; // Rethrow the exception to be handled by NestJS
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
}
