import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
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
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileUploadDto, userUpdateType } from './entities/user.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUserByToken(
    @Headers('Authorization') token: string,
    @Res() res: Response,
  ) {
    return this.userService.getUserByToken(token, res);
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
  @Put('/:userId')
  updateUser(
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') id: string,
    @Body() body: userUpdateType,
    @Res() res: Response,
  ) {
    return this.userService.updateUser(file, +id, body, res);
  }
}
