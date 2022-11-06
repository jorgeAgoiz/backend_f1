import { Controller, Get, Param } from '@nestjs/common';
import { Serialize } from 'src/common/interceptors/basic.interceptor';
import { RaceByDto } from './dtos/race-by.dto';
import { RaceDto } from './dtos/race.dto';
import { RaceService } from './race.service';

@Controller('race')
export class RaceController {
  constructor(private raceService: RaceService) {}

  @Serialize(RaceDto)
  @Get()
  getAllRaces() {
    return this.raceService.getAll();
  }

  @Serialize(RaceByDto)
  @Get('/driver/:id')
  getAllRacesByDriver(@Param('id') id: string) {
    return this.raceService.getAllRacesByDriver(parseInt(id));
  }

  @Serialize(RaceByDto)
  @Get('/circuit/:id')
  getAllRacesByCircuit(@Param('id') id: string) {
    return this.raceService.getAllRacesByCircuit(parseInt(id));
  }

  @Serialize(RaceByDto)
  @Get('/team/:id')
  getAllRacesByTeam(@Param('id') id: string) {
    return this.raceService.getAllRacesByTeam(parseInt(id));
  }
}
