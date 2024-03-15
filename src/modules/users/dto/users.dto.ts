import { IsString, IsEmail } from 'class-validator';

export class UsersDto {
  @IsString()
  id?: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
