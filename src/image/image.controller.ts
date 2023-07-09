import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { AuthGuard } from '@nestjs/passport';
<<<<<<< HEAD
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Image')
=======
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

// @UseGuards(AuthGuard('jwt'))
>>>>>>> origin/phong-img
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  getImg() {
    return this.imageService.getImg();
  }

  @Get(':ten')
  getImgByName(@Param('ten') ten: string) {
    return this.imageService.getImgByName(ten);
  }
  // GET thông tin ảnh và người tạo ảnh bằng id ảnh.
  @Get('/get-infor-img/:id') getImgInforById(
    @Param('id') imgId: string,
    @Res() res,
  ) {
    return this.imageService.getImgInforById(imgId, res);
  }

  // GET thông tin đã lưu hình này chưa theo id ảnh (dùng để kiểm tra ảnh này đã lưu chưa ở nút Save)
  @Get('/get-saveinfor-img/:imgId/userId') getImgSaveInforById(
    @Param('imgId') imgId: string,
    @Param('userId') userId,
    @Res() res,
  ) {
    return this.imageService.getImgSaveInforById(imgId, userId, res);
  }

  // GET danh sách ảnh đã lưu theo user id.
  @Get('/get-saved-img/:userId') getSavedImgById(
    @Param('userId') userId: string,
    @Res() res,
  ) {
    return this.imageService.getSavedImgById(userId, res);
  }

  // GET danh sách ảnh đã tạo theo user id.
  @Get('/get-created-img/:userId') getCreatedImgById(
    @Param('userId') userId: string,
    @Res() res,
  ) {
    return this.imageService.getCreatedImgById(userId, res);
  }
  // DELETE xoá ảnh đã tạo theo id ảnh.
  @Delete('/delete-img/:imgId') deleteImg(
    @Param('imgId') imgId: string,
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    return this.imageService.deleteImg(imgId, userId,res);
  }

  // POST thêm một ảnh của user
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) =>
          callback(null, new Date().getTime() + file.originalname),
      }),
    }),
  )
  @Post('/upload-img/:userId')
  uploadImg(
    @Param('userId') userId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() imgInfor,
    @Res() res: Response,
  ) {
    return this.imageService.uploadImg(userId, file, imgInfor, res);
  }
}
