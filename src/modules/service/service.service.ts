import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { serviceDto } from './dto/service.dto';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async create(data: serviceDto) {
    const service = await this.prisma.service.create({
      data,
      include: {
        vehicle: true,
        customer: true,
      },
    });

    return service;
  }

  async update(data: serviceDto, id: string) {
    const service = await this.prisma.service.update({
      data: {
        ...data,
      },
      where: {
        id: id,
      },
    });

    return service;
  }

  async findAll() {
    return this.prisma.service.findMany();
  }

  async findOne(id: string) {
    const service = await this.prisma.service.findUnique({
      where: {
        id,
      },
      include: {
        vehicle: true,
        customer: true,
      },
    });

    if (!service) {
      throw new BadRequestException('Service not found');
    }

    return service;
  }

  async delete(id: string) {
    const service = await this.prisma.service.delete({
      where: {
        id,
      },
    });

    return { message: 'Service removed' };
  }
}
