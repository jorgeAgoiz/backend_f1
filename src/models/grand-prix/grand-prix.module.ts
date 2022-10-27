import { Module } from '@nestjs/common';
import { GrandPrixService } from './grand-prix.service';
import { GrandPrixController } from './grand-prix.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrandPrix } from './grand-prix.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GrandPrix])],
  providers: [GrandPrixService],
  controllers: [GrandPrixController],
})
export class GrandPrixModule {}
