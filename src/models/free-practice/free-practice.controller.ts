import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FreePracticeService } from './free-practice.service';

@ApiTags('Free Practice Session')
@Controller('free-practice')
export class FreePracticeController {
  constructor(private freePracticeService: FreePracticeService) {}

  @Get()
  getFreePractices() {
    return this.freePracticeService.getAll();
  }

  @Get('/avg-speed/driver/:id')
  getAverageSpeedFreePracticesByDriver(@Param('id') id: string) {
    return this.freePracticeService.getAvgSpeedByDriver(parseInt(id));
  }

  @Get('/fps/driver/:id')
  getAllFpsByDriver(@Param('id') id: string) {
    return this.freePracticeService.getAllFpsByDriver(parseInt(id));
  }
}
