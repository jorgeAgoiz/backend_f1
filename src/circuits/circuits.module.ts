import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Circuit } from './circuit.entity';
import { CircuitsService } from './circuits.service';
import { CircuitsController } from './circuits.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Circuit])],
  providers: [CircuitsService],
  controllers: [CircuitsController],
})
export class CircuitsModule {}
