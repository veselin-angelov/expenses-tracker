import { IsEmail, IsString, IsUrl, IsUUID } from 'class-validator';

export class UserInfoDto {
  @IsUUID()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsUrl()
  picture: string;
}
