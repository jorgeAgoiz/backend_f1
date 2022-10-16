import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drivers } from './drivers.entity';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Drivers])],
  controllers: [DriversController],
  providers: [DriversService],
})
export class DriversModule {}
