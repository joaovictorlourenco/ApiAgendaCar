import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async create(data: CustomerDto) {
    const { cellphone, cpf } = data;

    // Verifica se existe antes de criar
    const existingCustomer = await this.prisma.customers.findFirst({
      where: {
        OR: [{ cellphone: { equals: cellphone } }, { cpf: { equals: cpf } }],
      },
    });

    if (existingCustomer) {
      throw new BadRequestException('Cellphone or CPF already exists');
    }

    const customer = await this.prisma.customers.create({
      data,
    });

    if (!customer) {
      throw new BadRequestException('Customer not created');
    }

    return customer;
  }
  async update(data: CustomerDto, id: string) {
    const customer = await this.prisma.customers.update({
      data: {
        ...data,
      },
      where: {
        id: id,
      },
    });

    return customer;
  }

  async findAll() {
    return this.prisma.customers.findMany();
  }

  async findOne(id: string) {
    const customer = await this.prisma.customers.findUnique({
      where: {
        id,
      },
    });

    if (!customer) {
      throw new BadRequestException('Customer not found');
    }

    return customer;
  }

  async delete(id: string) {
    const customer = await this.prisma.customers.delete({
      where: {
        id,
      },
    });

    return { message: 'Customer removed' };
  }
}
