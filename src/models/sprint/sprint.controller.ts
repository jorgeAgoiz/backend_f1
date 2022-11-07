import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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

  @Serialize(SprintDto)
  @Get()
  getSprints() {
    return this.sprintService.getAll();
  }

  @Serialize(SprintByDto)
  @Get('/driver/:id')
  getAllSprintsByDriver(@Param('id') id: string) {
    return this.sprintService.getAllSprintsByDriver(parseInt(id));
  }

  @Serialize(SprintByDto)
  @Get('/circuit/:id')
  getAllSprintsByCircuit(@Param('id') id: string) {
    return this.sprintService.getAllSprintsByCircuit(parseInt(id));
  }

  @Serialize(SprintByDto)
  @Get('/team/:id')
  getAllSprintsByTeam(@Param('id') id: string) {
    return this.sprintService.getAllSprintsByTeam(parseInt(id));
  }
}
