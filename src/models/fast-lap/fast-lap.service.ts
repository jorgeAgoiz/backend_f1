import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FLByDto } from './dtos/fl-by.dto';
import { FastLap } from './fast-lap.entity';

@Injectable()
export class FastLapService {
  constructor(@InjectRepository(FastLap) private repo: Repository<FastLap>) {}

  async getAll(type?: string): Promise<Array<FastLap>> {
    const lapsData: Array<FastLap> = await this.repo.find({
      where: {
        fl_session: type,
      },
    });
    if (!lapsData) {
      throw new BadRequestException('Something went wrong.');
    }
    if (lapsData.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return lapsData;
  }

  async getAllFastLapsByDriver(id: number): Promise<Array<FLByDto>> {
    const lapsData: Array<FLByDto> = await this.repo
      .createQueryBuilder('fl')
      .innerJoin('fl.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .innerJoin('gp.team', 'team')
      .where('driver.id = :id', { id })
      .select([
        'fl.grand_prix',
        'fl.fl_session',
        'fl.lap',
        'fl.time',
        'driver.name',
        'driver.id',
        'circuit.circuit_name',
        'circuit.id',
        'team.name',
        'team.id',
      ])
      .orderBy({
        'fl.grand_prix': 'ASC',
        'fl.fl_session': 'ASC',
      })
      .getRawMany();

    if (!lapsData) {
      throw new BadRequestException('Something went wrong.');
    }
    if (lapsData.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return lapsData;
  }

  async getAllFastLapsByCircuit(id: number): Promise<Array<FLByDto>> {
    const lapsData: Array<FLByDto> = await this.repo
      .createQueryBuilder('fl')
      .innerJoin('fl.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .innerJoin('gp.team', 'team')
      .where('circuit.id = :id', { id })
      .select([
        'fl.grand_prix',
        'fl.fl_session',
        'fl.lap',
        'fl.time',
        'driver.name',
        'driver.id',
        'circuit.circuit_name',
        'circuit.id',
        'team.name',
        'team.id',
      ])
      .orderBy({
        'fl.grand_prix': 'ASC',
        'fl.fl_session': 'ASC',
      })
      .getRawMany();

    if (!lapsData) {
      throw new BadRequestException('Something went wrong.');
    }
    if (lapsData.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return lapsData;
  }

  async getAllFastLapsByTeam(id: number): Promise<Array<FLByDto>> {
    const lapsData: Array<FLByDto> = await this.repo
      .createQueryBuilder('fl')
      .innerJoin('fl.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .innerJoin('gp.team', 'team')
      .where('team.id = :id', { id })
      .select([
        'fl.grand_prix',
        'fl.fl_session',
        'fl.lap',
        'fl.time',
        'driver.name',
        'driver.id',
        'circuit.circuit_name',
        'circuit.id',
        'team.name',
        'team.id',
      ])
      .orderBy({
        'fl.grand_prix': 'ASC',
        'fl.fl_session': 'ASC',
      })
      .getRawMany();

    if (!lapsData) {
      throw new BadRequestException('Something went wrong.');
    }
    if (lapsData.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return lapsData;
  }
}
