import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FPAvgSpeedDto } from './dtos/fp-avg-speed.dto';
import { FreePracticeDto } from './dtos/fp.dto';
import { FreePracticeService } from './free-practice.service';
import { Serialize } from '../../common/interceptors/basic.interceptor';
import { FPBy } from './dtos/fp-by.dto';
import { FPLapTimesDto } from './dtos/fp-laps.dto';
import { ApiKeyAuthGuard } from 'src/auth/guard/apikey-auth.guard';

@ApiTags('Free Practice Session')
@UseGuards(ApiKeyAuthGuard)
@Controller('free-practice')
export class FreePracticeController {
  constructor(private freePracticeService: FreePracticeService) {}

  @Serialize(FreePracticeDto)
  @Get()
  getFreePractices() {
    return this.freePracticeService.getAll();
  }

  @Serialize(FPBy)
  @Get('/driver/:id')
  getAllFpsByDriver(@Param('id') id: string) {
    return this.freePracticeService.getAllFpsByDriver(parseInt(id));
  }

  @Serialize(FPBy)
  @Get('/circuit/:id')
  getAllFpsByCircuit(@Param('id') id: string) {
    return this.freePracticeService.getAllFpsByCircuit(parseInt(id));
  }

  @Serialize(FPBy)
  @Get('/team/:id')
  getAllFpsByTeam(@Param('id') id: string) {
    return this.freePracticeService.getAllFpsByTeam(parseInt(id));
  }

  @Serialize(FPAvgSpeedDto)
  @Get('/avg-speed/driver/:id')
  getAverageSpeedFreePracticesByDriver(@Param('id') id: string) {
    return this.freePracticeService.getAvgSpeedByDriver(parseInt(id));
  }

  @Serialize(FPLapTimesDto)
  @Get('/laps-time/driver/:id')
  getLapTimesByDriver(@Param('id') id: string) {
    return this.freePracticeService.getLapsTimeByDriver(parseInt(id));
  }

  @Get('/positions/driver/:id')
  getPositionsByDriver(@Param('id') id: string) {
    return this.freePracticeService.getPositionsByDriver(parseInt(id));
  }
}
