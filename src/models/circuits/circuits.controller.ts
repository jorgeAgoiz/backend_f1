import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { ApiKeyAuthGuard } from 'src/auth/guard/apikey-auth.guard';
import { CircuitsService } from './circuits.service';
import { CreateCircuitDto } from './dtos/create-circuit.dto';
import { UpdateCircuitDto } from './dtos/update-circuit.dto';

@ApiTags('Circuits of formula one')
@UseGuards(ApiKeyAuthGuard)
@Controller('circuits')
export class CircuitsController {
  constructor(private circuitsService: CircuitsService) {}

  @Get()
  getCircuits(
    @Query('country') country: string,
    @Query('mindistance') mindistance: string,
    @Query('maxdistance') maxdistance: string,
  ) {
    return this.circuitsService.getAll({ country, mindistance, maxdistance });
  }

  @Get('/:id')
  getOneCircuitBy(@Param('id') id: string) {
    return this.circuitsService.getOneBy(parseInt(id));
  }

  @Post()
  insertCircuit(@Body() body: CreateCircuitDto) {
    const { gp_name, circuit_name, location, country, distance } = body;
    return this.circuitsService.insert({
      gp_name,
      circuit_name,
      location,
      country,
      distance,
    });
  }

  @Patch('/:id')
  updateCircuit(@Param('id') id: string, @Body() body: UpdateCircuitDto) {
    return this.circuitsService.update(parseInt(id), body);
  }

  @Delete('/:id')
  deleteCircuit(@Param('id') id: string) {
    return this.circuitsService.delete(parseInt(id));
  }
}
