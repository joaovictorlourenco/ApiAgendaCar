import { IsString, IsEmail } from 'class-validator';

export class UsersDto {
  @IsString()
  id?: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

}
