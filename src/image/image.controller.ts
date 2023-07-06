import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ImageService } from './image.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
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
}
