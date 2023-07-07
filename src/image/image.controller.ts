import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { ImageService } from './image.service';
import { AuthGuard } from '@nestjs/passport';

// @UseGuards(AuthGuard('jwt'))
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
  @Get('/get-infor-img/:id') getImgInforById(@Param('id') imgId: string ,@Res() res) {
    return this.imageService.getImgInforById(imgId,res);
  }

  // GET thông tin đã lưu hình này chưa theo id ảnh (dùng để kiểm tra ảnh này đã lưu chưa ở nút Save)
  @Get('/get-saveinfor-img/:imgId/userId') getImgSaveInforById(@Param('imgId') imgId: string , @Param('userId') userId ,@Res() res) {
    return this.imageService.getImgSaveInforById(imgId,userId,res);
  }

  // GET danh sách ảnh đã lưu theo user id.
  // GET danh sách ảnh đã tạo theo user id.
  // DELETE xoá ảnh đã tạo theo id ảnh.
  // POST thêm một ảnh của user
}
