import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './team.entity';

@Injectable()
export class TeamsService {
  constructor(@InjectRepository(Team) private repo: Repository<Team>) {}

  async getAll(country: string) {
    const teams: Array<Team> = await this.repo.find({ where: { country } });
    return teams;
  }

  async getOneBy(id: number) {
    const team: Team = await this.repo.findOneBy({ id });
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return team;
  }

  async insert({ name, country, url_logo }: Partial<Team>) {
    const newTeam: Team = await this.repo.create({
      name,
      country,
      url_logo,
    });

    console.log(newTeam);
    /* return await this.repo.save(newTeam) */
  }

  async update(id: number, attrs: Partial<Team>) {
    const team: Team = await this.repo.findOneBy({ id });
    if (!team) {
      throw new NotFoundException('Team not found');
    }

    console.log(attrs);
    /* return this.repo.save({...team, ...attrs}) */
  }

  async remove(id: number) {
    const team: Team = await this.repo.findOneBy({ id });
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    console.log(team);
    /* return await this.repo.remove(team) */
  }
}
