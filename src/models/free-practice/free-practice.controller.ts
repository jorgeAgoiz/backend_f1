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

  @Get('/:id')
  getAverageSpeedFreePracticesByGP(@Param('id') id: string) {
    return this.freePracticeService.getAvgSpeedByGp(parseInt(id));
  }
}
