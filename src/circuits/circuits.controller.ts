import { Controller, Get } from '@nestjs/common';
import { CircuitsService } from './circuits.service';

@Controller('circuits')
export class CircuitsController {
  constructor(private circuitsService: CircuitsService) {}

  @Get()
  getCircuits() {
    const circuits = this.circuitsService.get();
    console.log(circuits);
    return circuits;
  }
}
