import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../../decorator/public.decorator';
import { CreateUserDto, UsersDto } from '../users/dto/users.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() req: UsersDto) {
    return this.authService.login(req);
  }

  @Public()
  @Post('register')
  async register(@Body() req: CreateUserDto) {
    return this.authService.register(req);
  }

  @Public()
  @UseGuards(JwtAuthGuard)
  @Post('validateToken')
  async validateToken(@Body() data: any) {
    return this.authService.validateToken(data);
  }
}
