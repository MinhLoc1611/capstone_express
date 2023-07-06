import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { binh_luan } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/:hinhAnhId')
  getComment(@Param('hinhAnhId') hinhAnhId: string): Promise<binh_luan[]> {
    return this.commentService.getComment(+hinhAnhId);
  }

  @Post()
  postComment(@Body() body, @Res() res) {
    return this.commentService.postComment(body, res);
  }
}
