import { IsNumber, IsEmail, IsString, IsUrl } from 'class-validator';

export class UserInfoDto {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsUrl()
  picture: string;
}
