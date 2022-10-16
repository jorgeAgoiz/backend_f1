import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Circuits } from './circuits.entity';
import { CircuitsService } from './circuits.service';
import { CircuitsController } from './circuits.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Circuits])],
  providers: [CircuitsService],
  controllers: [CircuitsController],
})
export class CircuitsModule {}
