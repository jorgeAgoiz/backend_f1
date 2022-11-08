import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiKeyAuthGuard } from 'src/auth/guard/apikey-auth.guard';
import { Serialize } from 'src/common/interceptors/basic.interceptor';
import { SprintByDto } from './dtos/sprint-by.dto';
import { SprintDto } from './dtos/sprint.dto';
import { SprintService } from './sprint.service';

@ApiTags('Sprint Session')
@UseGuards(ApiKeyAuthGuard)
@Controller('sprint')
export class SprintController {
  constructor(private sprintService: SprintService) {}

  @ApiOperation({ summary: 'Get all sprint sessions' })
  @ApiOkResponse({ isArray: true, type: SprintDto })
  @Serialize(SprintDto)
  @Get()
  getSprints() {
    return this.sprintService.getAll();
  }

  @ApiOperation({ summary: 'Get all sprint sessions by driver ID' })
  @ApiOkResponse({ isArray: true, type: SprintByDto })
  @Serialize(SprintByDto)
  @Get('/driver/:id')
  getAllSprintsByDriver(@Param('id') id: string) {
    return this.sprintService.getAllSprintsByDriver(parseInt(id));
  }

  @ApiOperation({ summary: 'Get all sprint sessions by circuit ID' })
  @ApiOkResponse({ isArray: true, type: SprintByDto })
  @Serialize(SprintByDto)
  @Get('/circuit/:id')
  getAllSprintsByCircuit(@Param('id') id: string) {
    return this.sprintService.getAllSprintsByCircuit(parseInt(id));
  }

  @ApiOperation({ summary: 'Get all sprint sessions by team ID' })
  @ApiOkResponse({ isArray: true, type: SprintByDto })
  @Serialize(SprintByDto)
  @Get('/team/:id')
  getAllSprintsByTeam(@Param('id') id: string) {
    return this.sprintService.getAllSprintsByTeam(parseInt(id));
  }
}
