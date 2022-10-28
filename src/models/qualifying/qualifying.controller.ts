import { Controller, Get } from '@nestjs/common';
import { QualifyingService } from './qualifying.service';

@Controller('qualifying')
export class QualifyingController {
  constructor(private qualifyingService: QualifyingService) {}

  @Get()
  getQualifyings() {
    return this.qualifyingService.getAll();
  }
}
