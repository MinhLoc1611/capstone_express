import { ApiProperty } from '@nestjs/swagger';

export class ImgUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
  @ApiProperty({ description: 'Ten hinh', type: String, title: 'Ten hinh' })
  ten_hinh: string;
  @ApiProperty()
  mo_ta: string;
}
export class ImgUploadBodyDto {
  ten_hinh: string;
  mo_ta: string;
}

export class ImgDto {
  hinh_anh_id: number;
  ten_hinh: string;
  mo_ta: string;
  duong_dan: string;
  nguoi_dung_id: number;
}
export class ImgDeleteDto {
  imgId: string;
  message: string;
}
