import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FreePracticeAvgSpeedDto } from './dtos/free-practice-avg-speed.dto';
import { FreePracticeDto } from './dtos/free-practice.dto';
import { FreePracticeService } from './free-practice.service';
import { Serialize } from '../../common/interceptors/basic.interceptor';
import { FreePracticeBy } from './dtos/free-practice-by.dto';
import { FreePracticeLapsDto } from './dtos/free-practice-laps.dto';

@ApiTags('Free Practice Session')
@Controller('free-practice')
export class FreePracticeController {
  constructor(private freePracticeService: FreePracticeService) {}

  @Serialize(FreePracticeDto)
  @Get()
  getFreePractices() {
    return this.freePracticeService.getAll();
  }

  @Serialize(FreePracticeBy)
  @Get('/driver/:id')
  getAllFpsByDriver(@Param('id') id: string) {
    return this.freePracticeService.getAllFpsByDriver(parseInt(id));
  }

  @Serialize(FreePracticeBy)
  @Get('/circuit/:id')
  getAllFpsByCircuit(@Param('id') id: string) {
    return this.freePracticeService.getAllFpsByCircuit(parseInt(id));
  }

  @Serialize(FreePracticeBy)
  @Get('/team/:id')
  getAllFpsByTeam(@Param('id') id: string) {
    return this.freePracticeService.getAllFpsByTeam(parseInt(id));
  }

  @Serialize(FreePracticeAvgSpeedDto)
  @Get('/avg-speed/driver/:id')
  getAverageSpeedFreePracticesByDriver(@Param('id') id: string) {
    return this.freePracticeService.getAvgSpeedByDriver(parseInt(id));
  }

  @Serialize(FreePracticeLapsDto)
  @Get('/laps-time/driver/:id')
  getFLByDriverAndDriver(@Param('id') id: string) {
    return this.freePracticeService.getLapsTimeByDriver(parseInt(id));
  }

  @Get('/positions/driver/:id')
  getPositionsByDriver(@Param('id') id: string) {
    return this.freePracticeService.getPositionsByDriver(parseInt(id));
  }
}
