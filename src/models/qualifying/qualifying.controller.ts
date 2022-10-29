import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QualifyingService } from './qualifying.service';

@ApiTags('Qualifiying Session')
@Controller('qualifying')
export class QualifyingController {
  constructor(private qualifyingService: QualifyingService) {}

  @Get()
  getQualifyings() {
    return this.qualifyingService.getAll();
  }
}
