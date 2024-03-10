import { Module } from '@nestjs/common';
import { CustomerModule } from './modules/customer/customer.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { ServiceModule } from './modules/service/service.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    CustomerModule,
    VehicleModule,
    ServiceModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
