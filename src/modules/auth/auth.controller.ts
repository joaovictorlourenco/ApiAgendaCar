import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from '../../decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalStrategy)
  @Post('login')
  async login(@Body() req: any) {
    return this.authService.login(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(@Body() req: any) {
    return this.authService.register(req);
  }
}
