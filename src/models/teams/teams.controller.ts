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
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger/dist';
import { CreateTeamDto } from './dtos/create-team.dto';
import { UpdateTeamDto } from './dtos/update-team.dto';
import { ApiKeyAuthGuard } from 'src/auth/guard/apikey-auth.guard';
import { TeamDto } from './dtos/team.dto';

@ApiTags('Teams of formula one')
@UseGuards(ApiKeyAuthGuard)
@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @ApiOperation({ summary: 'Get all teams' })
  @ApiOkResponse({ isArray: true, type: TeamDto })
  @Get()
  getTeams(@Query('country') country: string) {
    return this.teamsService.getAll(country);
  }

  @ApiOperation({ summary: 'Get a team by ID' })
  @ApiOkResponse({ type: TeamDto })
  @Get('/:id')
  getOneTeamBy(@Param('id') id: string) {
    return this.teamsService.getOneBy(parseInt(id));
  }

  @ApiOperation({ summary: 'Insert a team' })
  @Post()
  insertTeam(@Body() body: CreateTeamDto) {
    const { name, country, url_logo } = body;
    return this.teamsService.insert({ name, country, url_logo });
  }

  @ApiOperation({ summary: 'Update a team by ID' })
  @Patch('/:id')
  updateTeam(@Param('id') id: string, @Body() body: UpdateTeamDto) {
    return this.teamsService.update(parseInt(id), body);
  }

  @ApiOperation({ summary: 'Delete a team by ID' })
  @Delete('/:id')
  deleteTeam(@Param('id') id: string) {
    return this.teamsService.remove(parseInt(id));
  }
}
