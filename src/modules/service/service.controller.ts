import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { serviceDto } from './dto/service.dto';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async create(@Body() data: serviceDto) {
    return this.serviceService.create(data);
  }

  @Put(':id')
  async update(@Body() data: serviceDto, @Param('id') id: string) {
    return this.serviceService.update(data, id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.serviceService.delete(id);
  }

  @Get('filter/:search')
  async search(@Param('search') search: string) {
    return this.serviceService.search(search);
  }

  @Get()
  async findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }
}
