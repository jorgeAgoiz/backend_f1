import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Driver])],
  controllers: [DriversController],
  providers: [DriversService],
})
export class DriversModule {}
