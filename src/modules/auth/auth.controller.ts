import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
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

  @UseGuards(JwtAuthGuard)
  @Get('validate-token')
  async validateToken(@Req() req: Request) {
    return this.authService.validateToken(req);
  }
}
