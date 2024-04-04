import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { VehicleDto } from './dto/vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(private prisma: PrismaService) {}

  async create(data: VehicleDto) {
    const vehicle = await this.prisma.vehicles.create({
      data: {
        ...data,
      },
    });

    if (!vehicle) {
      throw new BadRequestException('Vehicle not created');
    }

    return vehicle;
  }

  async findAll() {
    return await this.prisma.vehicles.findMany();
  }

  async findOne(id: string) {
    const vehicle = await this.prisma.vehicles.findUnique({
      where: {
        id,
      },
    });

    if (!vehicle) {
      throw new BadRequestException('Vehicle not found');
    }

    return vehicle;
  }

  async update(data: VehicleDto, id: string) {
    const vehicle = await this.prisma.vehicles.update({
      data: {
        ...data,
      },
      where: {
        id: id,
      },
    });

    return vehicle;
  }

  async delete(id: string) {
    const vehicle = await this.prisma.vehicles.delete({
      where: {
        id,
      },
    });

    return { message: 'Vehicle removed' };
  }

  async search(search: string) {
    if (Number.isNaN(parseInt(search))) {
      const vehicle = await this.prisma.vehicles.findMany({
        where: {
          OR: [
            {
              model: {
                contains: search,
              },
            },
            {
              brand: {
                contains: search,
              },
            },
          ],
        },
      });

      if (!vehicle) {
        throw new BadRequestException('Vehicle not found');
      }

      return vehicle;
    }

    const vehicle = await this.prisma.vehicles.findMany({
      where: {
        OR: [
          {
            year: {
              equals: parseInt(search),
            },
          },
        ],
      },
    });

    if (!vehicle) {
      throw new BadRequestException('Vehicle not found');
    }

    return vehicle;
  }
}
