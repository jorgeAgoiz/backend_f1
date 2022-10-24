import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Teams } from './teams.entity';

@Injectable()
export class TeamsService {
  constructor(@InjectRepository(Teams) private repo: Repository<Teams>) {}

  async getAll(country: string) {
    const teams: Array<Teams> = await this.repo.find({ where: { country } });
    return teams;
  }

  async getOneBy(id: number) {
    const team: Teams = await this.repo.findOneBy({ id });
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return team;
  }

  async insert({ name, country, url_logo }: Partial<Teams>) {
    const newTeam: Teams = await this.repo.create({
      name,
      country,
      url_logo,
    });

    console.log(newTeam);
    /* return await this.repo.save(newTeam) */
  }

  async update(id: number, attrs: Partial<Teams>) {
    const team: Teams = await this.repo.findOneBy({ id });
    if (!team) {
      throw new NotFoundException('Team not found');
    }

    console.log(attrs);
    /* return this.repo.save({...team, ...attrs}) */
  }

  async remove(id: number) {
    const team: Teams = await this.repo.findOneBy({ id });
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    console.log(team);
    /* return await this.repo.remove(team) */
  }
}
