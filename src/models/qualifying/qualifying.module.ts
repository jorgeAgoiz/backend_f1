import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualifyingController } from './qualifying.controller';
import { Qualifying } from './qualifying.entity';
import { QualifyingService } from './qualifying.service';

@Module({
  imports: [TypeOrmModule.forFeature([Qualifying])],
  controllers: [QualifyingController],
  providers: [QualifyingService],
})
export class QualifyingModule {}
