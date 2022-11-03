import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { TeamDto } from './dtos/team.dto';
import { CreateTeamDto } from './dtos/create-team.dto';
import { UpdateTeamDto } from './dtos/update-team.dto';

@Injectable()
export class TeamsService {
  constructor(@InjectRepository(Team) private repo: Repository<Team>) {}

  async getAll(country: string): Promise<Array<TeamDto>> {
    const teams: Array<TeamDto> = await this.repo.find({ where: { country } });
    if (!teams) {
      throw new NotFoundException('Teams data not found');
    }
    return teams;
  }

  async getOneBy(id: number): Promise<TeamDto> {
    const team: TeamDto = await this.repo.findOneBy({ id });
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return team;
  }

  async insert({ name, country, url_logo }: CreateTeamDto): Promise<TeamDto> {
    const newTeam: Team = await this.repo.create({
      name,
      country,
      url_logo,
    });
    if (!newTeam) {
      throw new BadRequestException('Something went wrong.');
    }
    return await this.repo.save(newTeam);
  }

  async update(id: number, attrs: UpdateTeamDto): Promise<TeamDto> {
    const team: TeamDto = await this.repo.findOneBy({ id });
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return await this.repo.save({ ...team, ...attrs });
  }

  async remove(id: number): Promise<TeamDto> {
    const team: TeamDto = await this.repo.findOneBy({ id });
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return await this.repo.remove(team);
  }
}
