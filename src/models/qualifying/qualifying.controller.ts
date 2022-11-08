import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiKeyAuthGuard } from 'src/auth/guard/apikey-auth.guard';
import { Serialize } from 'src/common/interceptors/basic.interceptor';
import { QFAvgSpeedDto } from './dtos/qf-avg-speed.dto';
import { QFByDto } from './dtos/qf-by.dto';
import { QFLapsDto } from './dtos/qf-laps.dto';
import { QFPositionsDto } from './dtos/qf-positions-by.dto';
import { QualifyingDto } from './dtos/qualifying.dto';
import { QualifyingService } from './qualifying.service';

@ApiTags('Qualifiying Session')
@UseGuards(ApiKeyAuthGuard)
@Controller('qualifying')
export class QualifyingController {
  constructor(private qualifyingService: QualifyingService) {}

  @ApiOperation({ summary: 'Get all classifications' })
  @ApiOkResponse({ isArray: true, type: QualifyingDto })
  @Serialize(QualifyingDto)
  @Get()
  getQualifyings() {
    return this.qualifyingService.getAll();
  }

  @ApiOperation({ summary: 'Get classifications by driver ID' })
  @ApiOkResponse({ isArray: true, type: QFByDto })
  @Serialize(QFByDto)
  @Get('/driver/:id')
  getQualifyingsByDriver(@Param('id') id: string) {
    return this.qualifyingService.getAllQfByDriver(parseInt(id));
  }

  @ApiOperation({ summary: 'Get classifications by circuit ID' })
  @ApiOkResponse({ isArray: true, type: QFByDto })
  @Serialize(QFByDto)
  @Get('/circuit/:id')
  getQualifyingsByCircuit(@Param('id') id: string) {
    return this.qualifyingService.getAllQfByCircuit(parseInt(id));
  }

  @ApiOperation({ summary: 'Get classifications by team ID' })
  @ApiOkResponse({ isArray: true, type: QFByDto })
  @Serialize(QFByDto)
  @Get('/team/:id')
  getQualifyingsByTeam(@Param('id') id: string) {
    return this.qualifyingService.getAllQfByTeam(parseInt(id));
  }

  @ApiOperation({
    summary: 'Get just average speeds in classifications by driver ID',
  })
  @ApiOkResponse({ isArray: true, type: QFAvgSpeedDto })
  @Serialize(QFAvgSpeedDto)
  @Get('/avg-speed/driver/:id')
  getAverageSpeedQualifyingsByDriver(@Param('id') id: string) {
    return this.qualifyingService.getAvgSpeedByDriver(parseInt(id));
  }

  @ApiOperation({
    summary: 'Get just lap times in classifications by driver ID',
  })
  @ApiOkResponse({ isArray: true, type: QFLapsDto })
  @Serialize(QFLapsDto)
  @Get('/laps-time/driver/:id')
  getLapsTimeByDriver(@Param('id') id: string) {
    return this.qualifyingService.getLapsTimeByDriver(parseInt(id));
  }

  @ApiOperation({
    summary: 'Get just positions in classifications by driver ID',
  })
  @ApiOkResponse({ isArray: true, type: QFPositionsDto })
  @Get('/positions/driver/:id')
  getPositionsByDriver(@Param('id') id: string) {
    return this.qualifyingService.getPositionsByDriver(parseInt(id));
  }
}
