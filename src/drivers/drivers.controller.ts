import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dtos/create-driver.dto';

@Controller('drivers')
export class DriversController {
  constructor(private driversService: DriversService) {}

  @Get()
  getDrivers(@Query('country') country: string) {
    return this.driversService.getAll(country);
  }

  @Get('/:id')
  getOneDriverBy(@Param('id') id: string) {
    return this.driversService.getOneBy(parseInt(id));
  }

  @Post()
  insertDriver(@Body() body: CreateDriverDto) {
    const { name, dorsal_number, birthday, country, picture } = body;
    return this.driversService.insert({
      name,
      dorsal_number,
      birthday,
      country,
      picture,
    });
  }

  @Delete('/:id')
  deleteDriver(@Param('id') id: string) {
    return this.driversService.remove(parseInt(id));
  }
}
