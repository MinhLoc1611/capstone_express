import { ApiProperty } from '@nestjs/swagger';

export class userUpdateType {
  email: string;

  ho_ten: string;

  tuoi: string;
}

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

  @ApiProperty()
  email: string;

  @ApiProperty()
  ho_ten: string;

  @ApiProperty()
  tuoi: string;
}
