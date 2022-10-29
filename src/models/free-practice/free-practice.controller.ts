import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FreePracticeAvgSpeedDto } from './dtos/free-practice-avg-speed.dto';
import { FreePracticeDto } from './dtos/free-practice.dto';
import { FreePracticeService } from './free-practice.service';
import { Serialize } from './serializers/free-practice.serializer';

@ApiTags('Free Practice Session')
@Controller('free-practice')
export class FreePracticeController {
  constructor(private freePracticeService: FreePracticeService) {}

  @Serialize(FreePracticeDto)
  @Get()
  getFreePractices() {
    return this.freePracticeService.getAll();
  }

  @Serialize(FreePracticeAvgSpeedDto)
  @Get('/avg-speed/driver/:id')
  getAverageSpeedFreePracticesByDriver(@Param('id') id: string) {
    return this.freePracticeService.getAvgSpeedByDriver(parseInt(id));
  }

  @Get('/fps/driver/:id')
  getAllFpsByDriver(@Param('id') id: string) {
    return this.freePracticeService.getAllFpsByDriver(parseInt(id));
  }
}
