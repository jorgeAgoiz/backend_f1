import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/common/interceptors/basic.interceptor';
import { QualifyingAvgSpeedDto } from './dtos/qualifying-avg-speed.dto';
import { QualifyingByDto } from './dtos/qualifying-by.dto';
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

  @Serialize(QualifyingByDto)
  @Get('/driver/:id')
  getQualifyingsByDriver(@Param('id') id: string) {
    return this.qualifyingService.getAllQfByDriver(parseInt(id));
  }

  @Serialize(QualifyingByDto)
  @Get('/circuit/:id')
  getQualifyingsByCircuit(@Param('id') id: string) {
    return this.qualifyingService.getAllQfByCircuit(parseInt(id));
  }

  @Serialize(QualifyingByDto)
  @Get('/team/:id')
  getQualifyingsByTeam(@Param('id') id: string) {
    return this.qualifyingService.getAllQfByTeam(parseInt(id));
  }

  @Serialize(QualifyingAvgSpeedDto)
  @Get('/avg-speed/driver/:id')
  getAverageSpeedQualifyingsByDriver(@Param('id') id: string) {
    return this.qualifyingService.getAvgSpeedByDriver(parseInt(id));
  }
}
