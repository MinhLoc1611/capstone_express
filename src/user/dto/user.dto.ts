import { ApiProperty } from '@nestjs/swagger';

export class userUpdateType {
  @ApiProperty()
  email: string;

  @ApiProperty()
  ho_ten: string;

  @ApiProperty()
  tuoi: number;
}

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
