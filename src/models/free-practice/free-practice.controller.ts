import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FreePracticeAvgSpeedDto } from './dtos/free-practice-avg-speed.dto';
import { FreePracticeDto } from './dtos/free-practice.dto';
import { FreePracticeService } from './free-practice.service';
import { Serialize } from '../../common/interceptors/basic.interceptor';
import { FreePracticeByDriver } from './dtos/free-practice-by-driver.dto';
import { FLByDriverAndCircuitReq } from './interfaces/free-practice.types';
import { FreePracticeFastLapDto } from './dtos/free-practice-fast-lap.dto';

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

  @Serialize(FreePracticeByDriver)
  @Get('/fps/driver/:id')
  getAllFpsByDriver(@Param('id') id: string) {
    return this.freePracticeService.getAllFpsByDriver(parseInt(id));
  }

  @Serialize(FreePracticeFastLapDto)
  @Get('/fast-laps')
  getFLByDriverAndDriver(@Query() query: FLByDriverAndCircuitReq) {
    return this.freePracticeService.getFastLapsByDriverAndCircuit(query);
  }
}
