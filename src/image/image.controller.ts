import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { type } from 'os';
import { ImgDeleteDto, ImgDto, ImgUploadBodyDto, ImgUploadDto } from './dto/img.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  @HttpCode(200)
  @Get()
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
  })
  getImg(): Promise<ImgDto[]> {
    return this.imageService.getImg();
  }

  @Get(':ten')
  getImgByName(@Param('ten') ten: string): Promise<ImgDto[]> {
    return this.imageService.getImgByName(ten);
  }
  // GET thông tin ảnh và người tạo ảnh bằng id ảnh.
  @Get('/get-infor-img/:id') getImgInforById(
    @Param('id') imgId: string,
  ): Promise<ImgDto> {
    return this.imageService.getImgInforById(imgId);
  }

  // GET thông tin đã lưu hình này chưa theo id ảnh (dùng để kiểm tra ảnh này đã lưu chưa ở nút Save)
  @Get('/get-saveinfor-img/:imgId/:userId') getImgSaveInforById(
    @Param('imgId') imgId: string,
    @Param('userId') userId: string,
  ) {
    return this.imageService.getImgSaveInforById(imgId, userId);
  }

  // GET danh sách ảnh đã lưu theo user id.
  @Get('/get-saved-img/:userId') getSavedImgById(
    @Param('userId') userId: string,
  ): Promise<ImgDto[]> {
    return this.imageService.getSavedImgById(userId);
  }

  // GET danh sách ảnh đã tạo theo user id.

  @Get('/get-created-img/:userId') getCreatedImgById(
    @Param('userId') userId: string,
  ): Promise<ImgDto[]> {
    return this.imageService.getCreatedImgById(userId);
  }
  // DELETE xoá ảnh đã tạo theo id ảnh.
  @Delete('/delete-img/:imgId/:userId') deleteImg(
    @Param('imgId') imgId: string,
    @Param('userId') userId: string,
  ): Promise<ImgDeleteDto> {
    return this.imageService.deleteImg(imgId, userId);
  }

  // POST thêm một ảnh của user
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: ImgUploadDto })
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
    @Body() imgInfor: ImgUploadBodyDto,
  ) {
    return this.imageService.uploadImg(userId, file, imgInfor);
  }
}
