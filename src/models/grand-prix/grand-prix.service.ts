import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grid } from '../grid/grid.entity';
import { Race } from '../race/race.entity';
import { GrandPrix } from './grand-prix.entity';
import {
  GPBestResultsDto,
  PolePosition,
  RacePosition,
} from './dtos/gp-best-results.dto';

@Injectable()
export class GrandPrixService {
  private readonly logger = new Logger();
  constructor(
    @InjectRepository(GrandPrix) private repo: Repository<GrandPrix>,
  ) {}

  async getAll() {
    const grandPrixs: Array<GrandPrix> = await this.repo.find();
    return grandPrixs;
  }

  async getBestResultsByDriverId(id: number): Promise<GPBestResultsDto> {
    this.logger.log(
      'Get Driver Best Results (Victories, Podiums and Pole Positions)',
    );
    const victories: Array<RacePosition> = await this.repo
      .createQueryBuilder('grand_prix')
      .innerJoin('grand_prix.driver', 'driver')
      .innerJoin('grand_prix.circuit', 'circuit')
      .leftJoinAndSelect(Race, 'race', 'race.grand_prix = grand_prix.id')
      .where('driver.id = :id', { id })
      .andWhere('race.position = 1')
      .select(['driver.name', 'circuit.gp_name', 'race.position'])
      .getRawMany();

    const podiums: Array<RacePosition> = await this.repo
      .createQueryBuilder('grand_prix')
      .innerJoin('grand_prix.driver', 'driver')
      .innerJoin('grand_prix.circuit', 'circuit')
      .leftJoinAndSelect(Race, 'race', 'race.grand_prix = grand_prix.id')
      .where('driver.id = :id', { id })
      .andWhere('race.position < :position', { position: 3 })
      .andWhere('race.position > 0')
      .select(['driver.name', 'circuit.gp_name', 'race.position'])
      .getRawMany();

    const polePositions: Array<PolePosition> = await this.repo
      .createQueryBuilder('grand_prix')
      .innerJoin('grand_prix.driver', 'driver')
      .innerJoin('grand_prix.circuit', 'circuit')
      .leftJoinAndSelect(Grid, 'grid', 'grid.grand_prix = grand_prix.id')
      .where('driver.id = :id', { id })
      .andWhere('grid.position = 1')
      .select([
        'driver.name',
        'circuit.gp_name',
        'grid.position',
        'grid.type_grid',
      ])
      .getRawMany();

    return { victories, podiums, polePositions };
  }
}
