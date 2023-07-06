import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUserByToken(@Headers('Authorization') token: string) {
    return this.userService.getUserByToken(token);
  }

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) =>
          callback(null, new Date().getTime() + file.originalname),
      }),
    }),
  )
  @Post('/upload-avatar/:userId')
  uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    return this.userService.uploadAvatar(file, +userId, res);
  }

  @Put('/:userId')
  updateUser(
    @Param('userId') id: string,
    @Body() body: any,
    @Res() res: Response,
  ) {
    return this.userService.updateUser(+id, body, res);
  }
}
