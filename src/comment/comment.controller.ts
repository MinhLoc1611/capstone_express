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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { postCommentType } from './entities/comment.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/:hinhAnhId')
  getComment(@Param('hinhAnhId') hinhAnhId: string, @Res() res: Response) {
    return this.commentService.getComment(+hinhAnhId, res);
  }

  @Post()
  postComment(@Body() body: postCommentType, @Res() res: Response) {
    return this.commentService.postComment(body, res);
  }
}
