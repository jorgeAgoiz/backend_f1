import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Circuit } from './circuit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Circuit])],
})
export class CircuitsModule {}
