import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FastLapController } from './fast-lap.controller';
import { FastLap } from './fast-lap.entity';
import { FastLapService } from './fast-lap.service';

@Module({
  imports: [TypeOrmModule.forFeature([FastLap])],
  controllers: [FastLapController],
  providers: [FastLapService],
})
export class FastLapModule {}
