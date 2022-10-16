import { Controller, Get } from '@nestjs/common';
import { DriversService } from './drivers.service';

@Controller('drivers')
export class DriversController {
  constructor(private driversService: DriversService) {}

  @Get()
  getDrivers() {
    const drivers = this.driversService.get();
    console.log(drivers);
    return drivers;
  }
}
