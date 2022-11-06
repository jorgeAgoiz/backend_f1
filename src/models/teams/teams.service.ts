import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { TeamDto } from './dtos/team.dto';
import { CreateTeamDto } from './dtos/create-team.dto';
import { UpdateTeamDto } from './dtos/update-team.dto';

@Injectable()
export class TeamsService {
  private readonly logger = new Logger();
  constructor(@InjectRepository(Team) private repo: Repository<Team>) {}

  async getAll(country: string): Promise<Array<TeamDto>> {
    this.logger.log('Get All Teams');
    const teams: Array<TeamDto> = await this.repo.find({ where: { country } });
    if (!teams) {
      throw new NotFoundException('Teams data not found');
    }
    return teams;
  }

  async getOneBy(id: number): Promise<TeamDto> {
    this.logger.log('Get A Team By ID');
    const team: TeamDto = await this.repo.findOneBy({ id });
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return team;
  }

  async insert({ name, country, url_logo }: CreateTeamDto): Promise<TeamDto> {
    this.logger.log('Insert New Team');
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
    this.logger.log('Update A Team');
    const team: TeamDto = await this.repo.findOneBy({ id });
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return await this.repo.save({ ...team, ...attrs });
  }

  async remove(id: number): Promise<TeamDto> {
    this.logger.log('Delete A Team');
    const team: TeamDto = await this.repo.findOneBy({ id });
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return await this.repo.remove(team);
  }
}
