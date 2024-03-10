import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleDto } from './dto/vehicle.dto';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  async create(@Body() data: VehicleDto) {
    return this.vehicleService.create(data);
  }

  @Put(':id')
  async update(@Body() data: VehicleDto, @Param('id') id: string) {
    return this.vehicleService.update(data, id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.vehicleService.delete(id);
  }

  @Get()
  async findAll() {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.vehicleService.findOne(id);
  }
}
