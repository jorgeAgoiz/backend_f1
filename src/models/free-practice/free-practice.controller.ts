import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FPAvgSpeedDto } from './dtos/fp-avg-speed.dto';
import { FreePracticeDto } from './dtos/fp.dto';
import { FreePracticeService } from './free-practice.service';
import { Serialize } from '../../common/interceptors/basic.interceptor';
import { FPByDto } from './dtos/fp-by.dto';
import { FPLapTimesDto } from './dtos/fp-laps.dto';
import { ApiKeyAuthGuard } from '../../auth/guard/apikey-auth.guard';

@ApiTags('Free Practice Session')
@UseGuards(ApiKeyAuthGuard)
@Controller('free-practice')
export class FreePracticeController {
  constructor(private freePracticeService: FreePracticeService) {}

  @ApiOperation({ summary: 'Get all free practices' })
  @ApiOkResponse({ isArray: true, type: FPByDto })
  @Serialize(FreePracticeDto)
  @Get()
  getFreePractices() {
    return this.freePracticeService.getAll();
  }

  @ApiOperation({ summary: 'Get free practices by driver ID' })
  @ApiOkResponse({ isArray: true, type: FPByDto })
  @Serialize(FPByDto)
  @Get('/driver/:id')
  getAllFpsByDriver(@Param('id') id: string) {
    return this.freePracticeService.getAllFpsByDriver(parseInt(id));
  }

  @ApiOperation({ summary: 'Get free practices by circuit ID' })
  @ApiOkResponse({ isArray: true, type: FPByDto })
  @Serialize(FPByDto)
  @Get('/circuit/:id')
  getAllFpsByCircuit(@Param('id') id: string) {
    return this.freePracticeService.getAllFpsByCircuit(parseInt(id));
  }

  @ApiOperation({ summary: 'Get free practices by team ID' })
  @ApiOkResponse({ isArray: true, type: FPByDto })
  @Serialize(FPByDto)
  @Get('/team/:id')
  getAllFpsByTeam(@Param('id') id: string) {
    return this.freePracticeService.getAllFpsByTeam(parseInt(id));
  }

  @ApiOperation({
    summary: 'Get just average speeds in free practices by driver ID',
  })
  @ApiOkResponse({ isArray: true, type: FPAvgSpeedDto })
  @Serialize(FPAvgSpeedDto)
  @Get('/avg-speed/driver/:id')
  getAverageSpeedFreePracticesByDriver(@Param('id') id: string) {
    return this.freePracticeService.getAvgSpeedByDriver(parseInt(id));
  }

  @ApiOperation({
    summary: 'Get just lap times in free practices by driver ID',
  })
  @ApiOkResponse({ isArray: true, type: FPAvgSpeedDto })
  @Serialize(FPLapTimesDto)
  @Get('/laps-time/driver/:id')
  getLapTimesByDriver(@Param('id') id: string) {
    return this.freePracticeService.getLapsTimeByDriver(parseInt(id));
  }

  @ApiOperation({
    summary: 'Get just positions in free practices by driver ID',
  })
  @ApiOkResponse({ isArray: true, type: FPAvgSpeedDto })
  @Get('/positions/driver/:id')
  getPositionsByDriver(@Param('id') id: string) {
    return this.freePracticeService.getPositionsByDriver(parseInt(id));
  }
}
