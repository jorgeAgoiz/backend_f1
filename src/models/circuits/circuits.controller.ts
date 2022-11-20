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
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger/dist';
import { ApiKeyAuthGuard } from '../../auth/guard/apikey-auth.guard';
import { CircuitsService } from './circuits.service';
import { CircuitDto } from './dtos/circuit.dto';
import { CreateCircuitDto } from './dtos/create-circuit.dto';
import { UpdateCircuitDto } from './dtos/update-circuit.dto';

@ApiTags('Circuits of formula one')
@UseGuards(ApiKeyAuthGuard)
@Controller('circuits')
export class CircuitsController {
  constructor(private circuitsService: CircuitsService) {}

  @ApiOperation({ summary: 'Get all circuits' })
  @ApiOkResponse({ isArray: true, type: CircuitDto })
  @Get()
  getCircuits(
    @Query('country') country: string,
    @Query('mindistance') mindistance: string,
    @Query('maxdistance') maxdistance: string,
  ) {
    return this.circuitsService.getAll({ country, mindistance, maxdistance });
  }

  @ApiOperation({ summary: 'Get a circuit by ID' })
  @ApiOkResponse({ type: CircuitDto })
  @Get('/:id')
  getOneCircuitBy(@Param('id') id: string) {
    return this.circuitsService.getOneBy(parseInt(id));
  }

  @ApiOperation({ summary: 'Insert a circuit' })
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

  @ApiOperation({ summary: 'Update a circuit by ID' })
  @Patch('/:id')
  updateCircuit(@Param('id') id: string, @Body() body: UpdateCircuitDto) {
    return this.circuitsService.update(parseInt(id), body);
  }

  @ApiOperation({ summary: 'Delete a circuit by ID' })
  @Delete('/:id')
  deleteCircuit(@Param('id') id: string) {
    return this.circuitsService.delete(parseInt(id));
  }
}
