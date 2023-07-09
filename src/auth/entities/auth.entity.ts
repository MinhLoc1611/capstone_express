import { ApiProperty } from '@nestjs/swagger';

export class userLoginType {
  @ApiProperty()
  email: string;

  @ApiProperty()
  matkhau: string;
}

export class userRegisterType {
  @ApiProperty()
  email: string;

  @ApiProperty()
  matkhau: string;

  @ApiProperty()
  ho_ten: string;

  @ApiProperty()
  tuoi: number;
}
