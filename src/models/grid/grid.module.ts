import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GridController } from './grid.controller';
import { Grid } from './grid.entity';
import { GridService } from './grid.service';

@Module({
  imports: [TypeOrmModule.forFeature([Grid])],
  controllers: [GridController],
  providers: [GridService],
})
export class GridModule {}
