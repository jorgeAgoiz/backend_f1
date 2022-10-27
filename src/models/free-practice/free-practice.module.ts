import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FreePracticeController } from './free-practice.controller';
import { FreePractice } from './free-practice.entity';
import { FreePracticeService } from './free-practice.service';

@Module({
  imports: [TypeOrmModule.forFeature([FreePractice])],
  controllers: [FreePracticeController],
  providers: [FreePracticeService],
})
export class FreePracticeModule {}
