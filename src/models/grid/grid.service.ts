import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GridByDto } from './dtos/grid-by.dto';
import { Grid } from './grid.entity';

@Injectable()
export class GridService {
  private readonly logger = new Logger();
  constructor(@InjectRepository(Grid) private repo: Repository<Grid>) {}

  async getAll(): Promise<Array<Grid>> {
    this.logger.log('Get All Grids');
    const grids: Array<Grid> = await this.repo.find();
    if (!grids) {
      throw new BadRequestException('Something went wrong.');
    }
    return grids;
  }

  async getAllGridsByType(type: string): Promise<Array<Grid>> {
    this.logger.log('Get All Grids By Type');
    const grids: Array<Grid> = await this.repo.findBy({ type_grid: type });
    if (!grids) {
      throw new BadRequestException('Something went wrong.');
    }
    return grids;
  }

  async getAllGridsByDriver(id: number): Promise<Array<GridByDto>> {
    this.logger.log('Get All Grids By Driver');
    const grids: Array<GridByDto> = await this.repo
      .createQueryBuilder('grid')
      .innerJoin('grid.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .innerJoin('gp.team', 'team')
      .where('driver.id = :id', { id })
      .select([
        'grid.grand_prix',
        'grid.position',
        'grid.type_grid',
        'driver.name',
        'driver.id',
        'circuit.circuit_name',
        'circuit.id',
        'team.name',
        'team.id',
      ])
      .orderBy({
        'circuit.id': 'ASC',
      })
      .getRawMany();

    if (!grids) {
      throw new BadRequestException('Something went wrong.');
    }
    if (grids.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }

    return grids;
  }

  async getAllGridsByCircuit(id: number) {
    this.logger.log('Get All Grids By Circuit');
    const grids: Array<GridByDto> = await this.repo
      .createQueryBuilder('grid')
      .innerJoin('grid.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .innerJoin('gp.team', 'team')
      .where('circuit.id = :id', { id })
      .select([
        'grid.grand_prix',
        'grid.position',
        'grid.type_grid',
        'driver.name',
        'driver.id',
        'circuit.circuit_name',
        'circuit.id',
        'team.name',
        'team.id',
      ])
      .orderBy({
        'grid.position': 'ASC',
      })
      .getRawMany();

    if (!grids) {
      throw new BadRequestException('Something went wrong.');
    }
    if (grids.length < 1) {
      throw new NotFoundException('Circuit data not found.');
    }

    return grids;
  }

  async getAllGridsByTeam(id: number) {
    this.logger.log('Get All Grids By Team');
    const grids: Array<GridByDto> = await this.repo
      .createQueryBuilder('grid')
      .innerJoin('grid.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .innerJoin('gp.team', 'team')
      .where('team.id = :id', { id })
      .select([
        'grid.grand_prix',
        'grid.position',
        'grid.type_grid',
        'driver.name',
        'driver.id',
        'circuit.circuit_name',
        'circuit.id',
        'team.name',
        'team.id',
      ])
      .orderBy({
        'circuit.id': 'ASC',
        'grid.position': 'ASC',
      })
      .getRawMany();

    if (!grids) {
      throw new BadRequestException('Something went wrong.');
    }
    if (grids.length < 1) {
      throw new NotFoundException('Team data not found.');
    }

    return grids;
  }
}
