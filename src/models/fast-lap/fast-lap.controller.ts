import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiKeyAuthGuard } from 'src/auth/guard/apikey-auth.guard';
import { Serialize } from 'src/common/interceptors/basic.interceptor';
import { FLByDto } from './dtos/fl-by.dto';
import { FastLapDto } from './dtos/fl.dto';
import { FastLapService } from './fast-lap.service';

@ApiTags('Fast Laps')
@UseGuards(ApiKeyAuthGuard)
@Controller('fast-lap')
export class FastLapController {
  constructor(private fastLapService: FastLapService) {}

  @ApiOperation({ summary: 'Get all fast laps' })
  @ApiOkResponse({ isArray: true, type: FastLapDto })
  @Serialize(FastLapDto)
  @Get()
  getFastLaps(@Query('type') type: string) {
    return this.fastLapService.getAll(type);
  }

  @ApiOperation({ summary: 'Get fast laps by driver ID' })
  @ApiOkResponse({ isArray: true, type: FLByDto })
  @Serialize(FLByDto)
  @Get('/driver/:id')
  getAllFastLapsByDriver(@Param('id') id: string) {
    return this.fastLapService.getAllFastLapsByDriver(parseInt(id));
  }

  @ApiOperation({ summary: 'Get fast laps by circuit ID' })
  @ApiOkResponse({ isArray: true, type: FLByDto })
  @Serialize(FLByDto)
  @Get('/circuit/:id')
  getAllFastLapsByCircuit(@Param('id') id: string) {
    return this.fastLapService.getAllFastLapsByCircuit(parseInt(id));
  }

  @ApiOperation({ summary: 'Get fast laps by team ID' })
  @ApiOkResponse({ isArray: true, type: FLByDto })
  @Serialize(FLByDto)
  @Get('/team/:id')
  getAllFastLapsByTeam(@Param('id') id: string) {
    return this.fastLapService.getAllFastLapsByTeam(parseInt(id));
  }
}
