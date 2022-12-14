import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grid } from '../grid/grid.entity';
import { Race } from '../race/race.entity';
import { FastLap } from '../fast-lap/fast-lap.entity';
import { GrandPrix } from './grand-prix.entity';

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

  async getBestResultsByDriverId(id: number): Promise<any> {
    this.logger.log('Get Driver Best Results');
    const data: any = await this.repo
      .createQueryBuilder('grand_prix')
      .innerJoin('grand_prix.driver', 'driver')
      .leftJoinAndSelect(Grid, 'grid', 'grid.grand_prix = grand_prix.id')
      .leftJoinAndSelect(Race, 'race', 'race.grand_prix = grand_prix.id')
      .leftJoinAndSelect(
        FastLap,
        'fast_lap',
        'fast_lap.grand_prix = grand_prix.id',
      )
      .where('driver.id = :id', { id })
      .andWhere('race.position = 1')
      .orWhere('driver.id = :id', { id })
      .andWhere('grid.position = 1')
      .select([
        'grand_prix.id',
        'driver.name',
        'race.position',
        'grid.position',
      ])
      .getRawMany();
    /* 
        Continuaremos aqui construyendo los condicionales
        https://typeorm.io/select-query-builder#adding-where-expression 
      */

    return data;
  }
}
