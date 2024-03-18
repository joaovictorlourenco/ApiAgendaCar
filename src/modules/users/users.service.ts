import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto, UsersDto } from './dto/users.dto';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<UsersDto | null | undefined> {
    return this.prisma.users.findUnique({
      where: {
        email,
      },
    });
  }

  async create(data: CreateUserDto) {
    const user = await this.findOne(data.email);

    if (user) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await hash(data.password, 10);

    return this.prisma.users.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }
}
