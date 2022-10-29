import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GrandPrixService } from './grand-prix.service';

@ApiTags('Grand Prix')
@Controller('grand-prix')
export class GrandPrixController {
  constructor(private grandPrixService: GrandPrixService) {}

  @Get()
  getAllGrandPrix() {
    return this.grandPrixService.getAll();
  }
}
