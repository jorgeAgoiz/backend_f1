import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/common/interceptors/basic.interceptor';
import { QFAvgSpeedDto } from './dtos/qf-avg-speed.dto';
import { QFByDto } from './dtos/qf-by.dto';
import { QFLapsDto } from './dtos/qf-laps.dto';
import { QualifyingDto } from './dtos/qualifying.dto';
import { QualifyingService } from './qualifying.service';

@ApiTags('Qualifiying Session')
@Controller('qualifying')
export class QualifyingController {
  constructor(private qualifyingService: QualifyingService) {}

  @Serialize(QualifyingDto)
  @Get()
  getQualifyings() {
    return this.qualifyingService.getAll();
  }

  @Serialize(QFByDto)
  @Get('/driver/:id')
  getQualifyingsByDriver(@Param('id') id: string) {
    return this.qualifyingService.getAllQfByDriver(parseInt(id));
  }

  @Serialize(QFByDto)
  @Get('/circuit/:id')
  getQualifyingsByCircuit(@Param('id') id: string) {
    return this.qualifyingService.getAllQfByCircuit(parseInt(id));
  }

  @Serialize(QFByDto)
  @Get('/team/:id')
  getQualifyingsByTeam(@Param('id') id: string) {
    return this.qualifyingService.getAllQfByTeam(parseInt(id));
  }

  @Serialize(QFAvgSpeedDto)
  @Get('/avg-speed/driver/:id')
  getAverageSpeedQualifyingsByDriver(@Param('id') id: string) {
    return this.qualifyingService.getAvgSpeedByDriver(parseInt(id));
  }

  @Serialize(QFLapsDto)
  @Get('/laps-time/driver/:id')
  getLapsTimeByDriver(@Param('id') id: string) {
    return this.qualifyingService.getLapsTimeByDriver(parseInt(id));
  }

  @Get('/positions/driver/:id')
  getPositionsByDriver(@Param('id') id: string) {
    return this.qualifyingService.getPositionsByDriver(parseInt(id));
  }
}
