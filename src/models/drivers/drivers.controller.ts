import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger/dist';
import { ApiKeyAuthGuard } from '../../auth/guard/apikey-auth.guard';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dtos/create-driver.dto';
import { DriverDto } from './dtos/driver.dto';
import { UpdateDriverDto } from './dtos/update-driver.dto';
@ApiTags('Drivers of formula one')
@UseGuards(ApiKeyAuthGuard)
@Controller('drivers')
export class DriversController {
  constructor(private driversService: DriversService) {}

  @ApiOperation({ summary: 'Get all drivers' })
  @ApiOkResponse({ isArray: true, type: DriverDto })
  @Get()
  getDrivers(@Query('country') country: string) {
    return this.driversService.getAll(country);
  }

  @ApiOperation({ summary: 'Get a driver by ID' })
  @ApiOkResponse({ type: DriverDto })
  @Get('/:id')
  getOneDriverBy(@Param('id') id: string) {
    return this.driversService.getOneBy(parseInt(id));
  }

  @ApiOperation({ summary: 'Insert a driver' })
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

  @ApiOperation({ summary: 'Update a driver by ID' })
  @Patch('/:id')
  updateDriver(@Param('id') id: string, @Body() body: UpdateDriverDto) {
    return this.driversService.update(parseInt(id), body);
  }

  @ApiOperation({ summary: 'Delete a driver by ID' })
  @Delete('/:id')
  deleteDriver(@Param('id') id: string) {
    return this.driversService.remove(parseInt(id));
  }
}
