import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { VehicleDto } from './dto/vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(private prisma: PrismaService) {}

  async create(data: VehicleDto) {
    const vehicle = await this.prisma.vehicle.create({
      data: {
        ...data,
      },
    });

    if (!vehicle) {
      throw new BadRequestException('Vehicle not created');
    }

    return vehicle;
  }

  findAll() {
    return this.prisma.vehicle.findMany();
  }

  findOne(id: string) {
    const vehicle = this.prisma.vehicle.findUnique({
      where: {
        id,
      },
    });

    if (!vehicle) {
      throw new BadRequestException('Vehicle not found');
    }

    return vehicle;
  }

  update(data: VehicleDto, id: string) {
    const vehicle = this.prisma.vehicle.update({
      data: {
        ...data,
      },
      where: {
        id: id,
      },
    });

    return vehicle;
  }

  delete(id: string) {
    const vehicle = this.prisma.vehicle.delete({
      where: {
        id,
      },
    });

    return { message: 'Vehicle removed' };
  }
}
