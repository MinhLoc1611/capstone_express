import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileUploadDto, userUpdateType } from './dto/user.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:userId')
  getUserById(@Param('userId') id: string, @Res() res: Response) {
    return this.userService.getUserById(+id, res);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDto })
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
    @Param('userId') id: string,
    @Res() res: Response,
  ) {
    return this.userService.uploadAvatar(file, +id, res);
  }

  @Put('/:userId')
  updateUser(
    @Param('userId') id: string,
    @Body() body: userUpdateType,
    @Res() res: Response,
  ) {
    return this.userService.updateUser(+id, body, res);
  }
}
