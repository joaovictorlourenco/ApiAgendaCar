import { IsNotEmpty, IsEnum, IsString, IsDate, IsInt } from 'class-validator';

export enum VehicleType {
  CAR = 'car',
  MOTO = 'moto',
}

export class VehicleDto {
  @IsNotEmpty()
  @IsEnum(VehicleType)
  type: VehicleType;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsInt()
  year: number;
}
