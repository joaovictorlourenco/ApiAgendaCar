import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(@Body() data: CustomerDto) {
    return this.customerService.create(data);
  }

  @Put(':id')
  async update(@Body() data: CustomerDto, @Param('id') id: string) {
    return this.customerService.update(data, id);
  }

  @Get()
  async findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.customerService.delete(id);
  }
}
