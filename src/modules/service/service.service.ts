import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { serviceDto } from './dto/service.dto';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async create(data: serviceDto) {
    const service = await this.prisma.services.create({
      data,
      include: {
        vehicles: true,
        customers: true,
      },
    });

    return service;
  }

  async update(data: serviceDto, id: string) {
    const service = await this.prisma.services.update({
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
    return this.prisma.services.findMany({
      include: {
        vehicles: true,
        customers: true,
      },
    });
  }

  async findOne(id: string) {
    const service = await this.prisma.services.findUnique({
      where: {
        id,
      },
      include: {
        vehicles: true,
        customers: true,
      },
    });

    if (!service) {
      throw new BadRequestException('Service not found');
    }

    return service;
  }

  async delete(id: string) {
    const service = await this.prisma.services.delete({
      where: {
        id,
      },
    });

    return { message: 'Service removed' };
  }

  async search(search: string) {
    const services = await this.prisma.services.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            description: {
              contains: search,
            },
          },
        ],
      },
    });

    return services;
  }
}
