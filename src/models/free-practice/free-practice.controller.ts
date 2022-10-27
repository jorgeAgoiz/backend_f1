import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FreePracticeService } from './free-practice.service';

@ApiTags('Free Practice Session')
@Controller('free-practice')
export class FreePracticeController {
  constructor(private freePracticeService: FreePracticeService) {}

  @Get()
  getFreePractices() {
    return this.freePracticeService.getAll();
  }
}
