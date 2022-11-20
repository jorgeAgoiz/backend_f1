import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiKeyAuthGuard } from '../../auth/guard/apikey-auth.guard';
import { Serialize } from '../../common/interceptors/basic.interceptor';
import { RaceByDto } from './dtos/race-by.dto';
import { RaceDto } from './dtos/race.dto';
import { RaceService } from './race.service';

@ApiTags('Race Session')
@UseGuards(ApiKeyAuthGuard)
@Controller('race')
export class RaceController {
  constructor(private raceService: RaceService) {}

  @ApiOperation({ summary: 'Get all races' })
  @ApiOkResponse({ isArray: true, type: RaceDto })
  @Serialize(RaceDto)
  @Get()
  getAllRaces() {
    return this.raceService.getAll();
  }

  @ApiOperation({ summary: 'Get all races by driver ID' })
  @ApiOkResponse({ isArray: true, type: RaceByDto })
  @Serialize(RaceByDto)
  @Get('/driver/:id')
  getAllRacesByDriver(@Param('id') id: string) {
    return this.raceService.getAllRacesByDriver(parseInt(id));
  }

  @ApiOperation({ summary: 'Get all races by circuit ID' })
  @ApiOkResponse({ isArray: true, type: RaceByDto })
  @Serialize(RaceByDto)
  @Get('/circuit/:id')
  getAllRacesByCircuit(@Param('id') id: string) {
    return this.raceService.getAllRacesByCircuit(parseInt(id));
  }

  @ApiOperation({ summary: 'Get all races by team ID' })
  @ApiOkResponse({ isArray: true, type: RaceByDto })
  @Serialize(RaceByDto)
  @Get('/team/:id')
  getAllRacesByTeam(@Param('id') id: string) {
    return this.raceService.getAllRacesByTeam(parseInt(id));
  }
}
