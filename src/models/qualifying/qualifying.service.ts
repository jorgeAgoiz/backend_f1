import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QFAvgSpeedDto } from './dtos/qf-avg-speed.dto';
import { QFByDto } from './dtos/qf-by.dto';
import { QFLapsDto } from './dtos/qf-laps.dto';
import { QFPositionsDto } from './dtos/qf-positions-by.dto';
import { Qualifying } from './qualifying.entity';

@Injectable()
export class QualifyingService {
  constructor(
    @InjectRepository(Qualifying) private repo: Repository<Qualifying>,
  ) {}

  async getAll(): Promise<Array<Qualifying>> {
    const qfsData: Array<Qualifying> = await this.repo.find();
    if (!qfsData) {
      throw new BadRequestException('Something went wrong.');
    }
    if (qfsData.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return qfsData;
  }

  async getAllQfByDriver(id: number): Promise<Array<QFByDto>> {
    const driverQfData: Array<QFByDto> = await this.repo
      .createQueryBuilder('qf')
      .innerJoin('qf.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .innerJoin('gp.team', 'team')
      .where('driver.id = :id', { id })
      .select([
        'qf.grand_prix',
        'qf.qf_number',
        'qf.position',
        'qf.laps',
        'qf.fast_lap',
        'qf.average_speed',
        'driver.name',
        'driver.id',
        'circuit.circuit_name',
        'circuit.id',
        'team.name',
        'team.id',
      ])
      .orderBy({
        'qf.grand_prix': 'ASC',
        'qf.qf_number': 'ASC',
        'qf.position': 'ASC',
      })
      .getRawMany();
    if (!driverQfData) {
      throw new BadRequestException('Something went wrong.');
    }
    if (driverQfData.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return driverQfData;
  }

  async getAllQfByCircuit(id: number): Promise<Array<QFByDto>> {
    const circuitQfData: Array<QFByDto> = await this.repo
      .createQueryBuilder('qf')
      .innerJoin('qf.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .innerJoin('gp.team', 'team')
      .where('circuit.id = :id', { id })
      .select([
        'qf.grand_prix',
        'qf.qf_number',
        'qf.position',
        'qf.laps',
        'qf.fast_lap',
        'qf.average_speed',
        'driver.name',
        'driver.id',
        'circuit.circuit_name',
        'circuit.id',
        'team.name',
        'team.id',
      ])
      .orderBy({
        'qf.grand_prix': 'ASC',
        'qf.qf_number': 'ASC',
        'qf.position': 'ASC',
      })
      .getRawMany();
    if (!circuitQfData) {
      throw new BadRequestException('Something went wrong.');
    }
    if (circuitQfData.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return circuitQfData;
  }

  async getAllQfByTeam(id: number): Promise<Array<QFByDto>> {
    const teamQfData: Array<QFByDto> = await this.repo
      .createQueryBuilder('qf')
      .innerJoin('qf.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .innerJoin('gp.team', 'team')
      .where('team.id = :id', { id })
      .select([
        'qf.grand_prix',
        'qf.qf_number',
        'qf.position',
        'qf.laps',
        'qf.fast_lap',
        'qf.average_speed',
        'driver.name',
        'driver.id',
        'circuit.circuit_name',
        'circuit.id',
        'team.name',
        'team.id',
      ])
      .orderBy({
        'qf.grand_prix': 'ASC',
        'qf.qf_number': 'ASC',
        'qf.position': 'ASC',
      })
      .getRawMany();
    if (!teamQfData) {
      throw new BadRequestException('Something went wrong.');
    }
    if (teamQfData.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return teamQfData;
  }

  async getAvgSpeedByDriver(id: number): Promise<Array<QFAvgSpeedDto>> {
    const averageSpeeds: Array<QFAvgSpeedDto> = await this.repo
      .createQueryBuilder('qf')
      .innerJoin('qf.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .innerJoin('gp.team', 'team')
      .where('driver.id = :id', { id })
      .select(['qf.average_speed', 'qf.qf_number', 'circuit.circuit_name'])
      .orderBy({
        'qf.grand_prix': 'ASC',
        'qf.qf_number': 'ASC',
      })
      .getRawMany();
    if (!averageSpeeds) {
      throw new BadRequestException('Something went wrong.');
    }
    if (averageSpeeds.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return averageSpeeds;
  }

  async getLapsTimeByDriver(id: number): Promise<Array<QFLapsDto>> {
    const lapsTimes: Array<QFLapsDto> = await this.repo
      .createQueryBuilder('qf')
      .innerJoin('qf.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .innerJoin('gp.team', 'team')
      .where('driver.id = :id', { id })
      .select(['qf.fast_lap', 'qf.qf_number', 'circuit.circuit_name'])
      .orderBy({
        'gp.circuit': 'ASC',
        'qf.qf_number': 'ASC',
      })
      .getRawMany();
    if (!lapsTimes) {
      throw new BadRequestException('Something went wrong.');
    }
    if (lapsTimes.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return lapsTimes;
  }

  async getPositionsByDriver(id: number): Promise<Array<QFPositionsDto>> {
    const positions: Array<QFPositionsDto> = await this.repo
      .createQueryBuilder('qf')
      .innerJoin('qf.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .innerJoin('gp.team', 'team')
      .where('driver.id = :id', { id })
      .select(['qf.position', 'qf.qf_number', 'circuit.circuit_name'])
      .orderBy({
        'gp.circuit': 'ASC',
        'qf.qf_number': 'ASC',
      })
      .getRawMany();
    if (!positions) {
      throw new BadRequestException('Something went wrong');
    }
    if (positions.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return positions;
  }
}
