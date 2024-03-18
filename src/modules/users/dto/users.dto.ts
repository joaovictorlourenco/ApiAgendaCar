import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UsersDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class CreateUserDto extends UsersDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
