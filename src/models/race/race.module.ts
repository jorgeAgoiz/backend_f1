import { Module } from '@nestjs/common';
import { RaceController } from './race.controller';
import { RaceService } from './race.service';

@Module({
  controllers: [RaceController],
  providers: [RaceService]
})
export class RaceModule {}
