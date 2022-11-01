import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/common/interceptors/basic.interceptor';
import { QualifiyingByDto } from './dtos/qualifying-by.dto';
import { QualifiyingDto } from './dtos/qualifying.dto';
import { QualifyingService } from './qualifying.service';

@ApiTags('Qualifiying Session')
@Controller('qualifying')
export class QualifyingController {
  constructor(private qualifyingService: QualifyingService) {}

  @Serialize(QualifiyingDto)
  @Get()
  getQualifyings() {
    return this.qualifyingService.getAll();
  }

  @Serialize(QualifiyingByDto)
  @Get('/driver/:id')
  getQualifyingsByDriver(@Param('id') id: string) {
    return this.qualifyingService.getAllQfByDriver(parseInt(id));
  }

  @Serialize(QualifiyingByDto)
  @Get('/circuit/:id')
  getQualifyingsByCircuit(@Param('id') id: string) {
    return this.qualifyingService.getAllQfByCircuit(parseInt(id));
  }

  @Serialize(QualifiyingByDto)
  @Get('/team/:id')
  getQualifyingsByTeam(@Param('id') id: string) {
    return this.qualifyingService.getAllQfByTeam(parseInt(id));
  }
}
