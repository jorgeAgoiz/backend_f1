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
import { TeamsService } from './teams.service';
import { ApiTags } from '@nestjs/swagger/dist';
import { CreateTeamDto } from './dtos/create-team.dto';
import { UpdateTeamDto } from './dtos/update-team.dto';
import { ApiKeyAuthGuard } from 'src/auth/guard/apikey-auth.guard';

@ApiTags('Teams of formula one')
@UseGuards(ApiKeyAuthGuard)
@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @Get()
  getTeams(@Query('country') country: string) {
    return this.teamsService.getAll(country);
  }

  @Get('/:id')
  getOneTeamBy(@Param('id') id: string) {
    return this.teamsService.getOneBy(parseInt(id));
  }

  @Post()
  insertTeam(@Body() body: CreateTeamDto) {
    const { name, country, url_logo } = body;
    return this.teamsService.insert({ name, country, url_logo });
  }

  @Patch('/:id')
  updateTeam(@Param('id') id: string, @Body() body: UpdateTeamDto) {
    return this.teamsService.update(parseInt(id), body);
  }

  @Delete('/:id')
  deleteTeam(@Param('id') id: string) {
    return this.teamsService.remove(parseInt(id));
  }
}
