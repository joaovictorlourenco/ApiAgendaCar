import { BadRequestException, ConsoleLogger, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { CreateUserDto, UsersDto } from '../users/dto/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      return new BadRequestException('User not found');
    }

    const isPasswordMatching = await compare(pass, user.password);

    if (isPasswordMatching) {
      const { password, ...result } = user;
      return result;
    }

    return new BadRequestException('Invalid credentials');
  }

  async login(user: UsersDto) {
    const { email, password } = user;

    const userFound = await this.usersService.findOne(email);

    if (!userFound) {
      return new BadRequestException('User not found');
    }

    const isPasswordMatching = await compare(password, userFound.password);

    if (!isPasswordMatching) {
      return new BadRequestException('Invalid credentials');
    }

    const payload = { email: userFound.email, sub: userFound.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto) {
    const response = await this.usersService.create(user);

    return response;
  }

  async validateToken(data: any) {
    try {
      const decoded = this.jwtService.verify(data['token']);

      const currentDate = new Date().getTime() / 1000;

      if (decoded.exp < currentDate) {
        return { isAuth: false };
      }

      return { isAuth: true };
    } catch (e) {
      return { isAuth: false };
    }
  }
}
