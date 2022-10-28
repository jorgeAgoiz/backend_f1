import { Module } from '@nestjs/common';
import { FastLapController } from './fast-lap.controller';
import { FastLapService } from './fast-lap.service';

@Module({
  controllers: [FastLapController],
  providers: [FastLapService]
})
export class FastLapModule {}
