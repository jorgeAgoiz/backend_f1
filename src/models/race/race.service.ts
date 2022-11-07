import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RaceByDto } from './dtos/race-by.dto';
import { Race } from './race.entity';

@Injectable()
export class RaceService {
  private readonly logger = new Logger();
  constructor(@InjectRepository(Race) private repo: Repository<Race>) {}

  async getAll(): Promise<Array<Race>> {
    this.logger.log('Get All Races');
    const racesData: Array<Race> = await this.repo.find();
    if (!racesData) {
      throw new BadRequestException('Something went wrong.');
    }
    if (racesData.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return racesData;
  }

  async getAllRacesByDriver(id: number): Promise<Array<RaceByDto>> {
    this.logger.log('Get All Races By Driver');
    const racesData: Array<RaceByDto> = await this.repo
      .createQueryBuilder('race')
      .innerJoin('race.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .innerJoin('gp.team', 'team')
      .where('driver.id = :id', { id })
      .select([
        'race.grand_prix',
        'race.position',
        'race.laps_disputed',
        'race.average_speed',
        'race.num_pit_stops',
        'race.total_time',
        'race.retired',
        'race.race_points',
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

    if (!racesData) {
      throw new BadRequestException('Something went wrong.');
    }
    if (racesData.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return racesData;
  }

  async getAllRacesByCircuit(id: number): Promise<Array<RaceByDto>> {
    this.logger.log('Get All Races By Circuit');
    const racesData: Array<RaceByDto> = await this.repo
      .createQueryBuilder('race')
      .innerJoin('race.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .innerJoin('gp.team', 'team')
      .where('circuit.id = :id', { id })
      .select([
        'race.grand_prix',
        'race.position',
        'race.laps_disputed',
        'race.average_speed',
        'race.num_pit_stops',
        'race.total_time',
        'race.retired',
        'race.race_points',
        'driver.name',
        'driver.id',
        'circuit.circuit_name',
        'circuit.id',
        'team.name',
        'team.id',
      ])
      .orderBy({
        'race.position': 'ASC',
      })
      .getRawMany();

    if (!racesData) {
      throw new BadRequestException('Something went wrong.');
    }
    if (racesData.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return racesData;
  }

  async getAllRacesByTeam(id: number): Promise<Array<RaceByDto>> {
    this.logger.log('Get All Races By Team');
    const racesData: Array<RaceByDto> = await this.repo
      .createQueryBuilder('race')
      .innerJoin('race.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .innerJoin('gp.team', 'team')
      .where('team.id = :id', { id })
      .select([
        'race.grand_prix',
        'race.position',
        'race.laps_disputed',
        'race.average_speed',
        'race.num_pit_stops',
        'race.total_time',
        'race.retired',
        'race.race_points',
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

    if (!racesData) {
      throw new BadRequestException('Something went wrong.');
    }
    if (racesData.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return racesData;
  }
}
