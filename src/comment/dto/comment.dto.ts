import { ApiProperty } from '@nestjs/swagger';

export class postCommentType {
  @ApiProperty()
  nguoi_dung_id: number;

  @ApiProperty()
  hinh_anh_id: number;

  @ApiProperty()
  noi_dung: string;
}
