import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaceController } from './race.controller';
import { Race } from './race.entity';
import { RaceService } from './race.service';

@Module({
  imports: [TypeOrmModule.forFeature([Race])],
  controllers: [RaceController],
  providers: [RaceService],
})
export class RaceModule {}
