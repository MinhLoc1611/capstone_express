import { Injectable } from '@nestjs/common';
import { PrismaClient, hinh_anh } from '@prisma/client';
import { GetResult } from '@prisma/client/runtime';
import { errorCode, failCode, successCode } from 'src/config/response';

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
  // GET thông tin ảnh và người tạo ảnh bằng id ảnh.
  async getImgInforById(imgId: string, res: Response) {
    try {
      const data = await this.prisma.hinh_anh.findFirst({
        where: {
          hinh_anh_id: +imgId,
        },
        include: {
          nguoi_dung: true,
        },
      });
      if (data) {
        return successCode(res, data, 'Lay data thanh cong');
      } else {
        return failCode(res, 'Khong co tai nguyen, img not exist');
      }
    } catch (error) {
      return errorCode(error, 'Loi Backend');
    }
  }
  // GET thông tin đã lưu hình này chưa theo id ảnh (dùng để kiểm tra ảnh này đã
  async getImgSaveInforById(imgId: string, userId: string, res: Response) {
    try {
      const data = await this.prisma.hinh_anh.findFirst({
        where: {
          hinh_anh_id: +imgId,
        },
        include: {
          nguoi_dung: true,
          luu_anh: {
            where: {
              nguoi_dung_id: +userId,
            },
          },
        },
      });
      if (data) {
        let cloneData = { ...data, isSaved: false };
        if (data.luu_anh.length >= 1) {
          cloneData.isSaved = true;
          return successCode(res, cloneData, 'Lay data thanh cong');
        }
        return successCode(res, cloneData, 'Lay data thanh cong');
      } else {
        return failCode(res, 'Khong co tai nguyen, img not exist');
      }
    } catch (error) {
      return errorCode(error, 'Loi Backend');
    }
  }
  // GET danh sách ảnh đã lưu theo user id.
  async getSavedImgById(userId: string, res: Response) {
    try {
      const data = await this.prisma.luu_anh.findMany({
        where: {
          nguoi_dung_id: +userId,
        },
        include: {
          hinh_anh: true,
        },
      });
      if (data) {
        return successCode(res, data, 'Lay data thanh cong');
      } else {
        return failCode(res, 'Khong co tai nguyen, img not exist');
      }
    } catch (error) {
      return errorCode(error, 'Loi Backend');
    }
  }
  //  GET danh sách ảnh đã tạo theo user id.
  async getCreatedImgById(userId: string, res: Response) {
    try {
      const data = await this.prisma.hinh_anh.findMany({
        where: {
          nguoi_dung_id: +userId,
        },
      });
      if (data) {
        return successCode(res, data, 'Lay data thanh cong');
      } else {
        return failCode(res, 'Khong co tai nguyen, img not exist');
      }
    } catch (error) {
      return errorCode(error, 'Loi Backend');
    }
  }
  async deleteImg(imgId: string, res: Response) {
    try {
      await this.prisma.hinh_anh.delete({
        where: {
          hinh_anh_id: +imgId,
        },
      });
      return successCode(res, imgId, 'Xoa thanh cong');
    } catch (error) {
      return errorCode(error, 'Loi Backend');
    }
  }
  async uploadImg(
    userId: string,
    file: Express.Multer.File,
    imgInfor: hinh_anh,
    res: Response,
  ) {
    try {
      let checkUser = await this.prisma.nguoi_dung.findFirst({
        where: {
          nguoi_dung_id: +userId,
        },
      });
      if (checkUser) {
        imgInfor.duong_dan = file.filename;
        imgInfor.nguoi_dung_id = +userId;

        await this.prisma.hinh_anh.create({ data: imgInfor });
        return successCode(res, imgInfor, 'Them hinh thanh cong');
      } else {
        return failCode(res,"Nguoi dung k ton tai")
      }
    } catch (error) {
      return errorCode(error, 'Loi Backend');
    }
  }
}
