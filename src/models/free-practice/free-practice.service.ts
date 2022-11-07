import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FreePractice } from './free-practice.entity';
import { FPBy } from './dtos/fp-by.dto';
import { FPAvgSpeedDto } from './dtos/fp-avg-speed.dto';
import { FPLapTimesDto } from './dtos/fp-laps.dto';
import { FPPositionsDto } from './dtos/fp-positions-by.dto';

@Injectable()
export class FreePracticeService {
  private readonly logger = new Logger();
  constructor(
    @InjectRepository(FreePractice) private repo: Repository<FreePractice>,
  ) {}

  async getAll(): Promise<Array<FreePractice>> {
    this.logger.log('Get All Free Practices');
    const fpsData: Array<FreePractice> = await this.repo.find();

    if (!fpsData) {
      throw new BadRequestException('Something went wrong.');
    }
    if (fpsData.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return fpsData;
  }

  async getAllFpsByDriver(id: number): Promise<Array<FPBy>> {
    this.logger.log('Get All Free Practices By Driver');
    const driverFpsData: Array<FPBy> = await this.repo
      .createQueryBuilder('fp')
      .innerJoin('fp.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .innerJoin('gp.team', 'team')
      .where('driver.id = :id', { id })
      .select([
        'fp.grand_prix',
        'fp.fp_number',
        'fp.laps',
        'fp.position',
        'fp.fast_lap',
        'fp.average_speed',
        'driver.name',
        'driver.id',
        'circuit.circuit_name',
        'circuit.id',
        'team.name',
        'team.id',
      ])
      .orderBy({
        'fp.grand_prix': 'ASC',
        'fp.fp_number': 'ASC',
        'fp.position': 'ASC',
      })
      .getRawMany();

    if (!driverFpsData) {
      throw new BadRequestException('Something went wrong.');
    }
    if (driverFpsData.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return driverFpsData;
  }

  async getAllFpsByCircuit(id: number): Promise<Array<FPBy>> {
    this.logger.log('Get All Free Practices By Circuit');
    const circuitFpsData: Array<FPBy> = await this.repo
      .createQueryBuilder('fp')
      .innerJoin('fp.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .innerJoin('gp.team', 'team')
      .where('circuit.id = :id', { id })
      .select([
        'fp.grand_prix',
        'fp.fp_number',
        'fp.laps',
        'fp.position',
        'fp.fast_lap',
        'fp.average_speed',
        'driver.name',
        'driver.id',
        'circuit.circuit_name',
        'circuit.id',
        'team.name',
        'team.id',
      ])
      .orderBy({
        'fp.grand_prix': 'ASC',
        'fp.fp_number': 'ASC',
        'fp.position': 'ASC',
      })
      .getRawMany();

    if (!circuitFpsData) {
      throw new BadRequestException('Something went wrong.');
    }
    if (circuitFpsData.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return circuitFpsData;
  }

  async getAllFpsByTeam(id: number): Promise<Array<FPBy>> {
    this.logger.log('Get All Free Practices By Team');
    const teamFpsData: Array<FPBy> = await this.repo
      .createQueryBuilder('fp')
      .innerJoin('fp.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .innerJoin('gp.team', 'team')
      .where('team.id = :id', { id })
      .select([
        'fp.grand_prix',
        'fp.fp_number',
        'fp.laps',
        'fp.position',
        'fp.fast_lap',
        'fp.average_speed',
        'driver.name',
        'driver.id',
        'circuit.circuit_name',
        'circuit.id',
        'team.name',
        'team.id',
      ])
      .orderBy({
        'fp.grand_prix': 'ASC',
        'fp.fp_number': 'ASC',
        'fp.position': 'ASC',
      })
      .getRawMany();

    if (!teamFpsData) {
      throw new BadRequestException('Something went wrong.');
    }
    if (teamFpsData.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return teamFpsData;
  }

  async getAvgSpeedByDriver(id: number): Promise<Array<FPAvgSpeedDto>> {
    this.logger.log('Get All Average Speeds In Free Practices By Driver');
    const averageSpeeds: Array<FPAvgSpeedDto> = await this.repo
      .createQueryBuilder('fp')
      .innerJoin('fp.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .where('driver.id = :id', { id })
      .select(['fp.average_speed', 'fp.fp_number', 'circuit.circuit_name'])
      .getRawMany();

    if (!averageSpeeds) {
      throw new BadRequestException('Something went wrong.');
    }
    if (averageSpeeds.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return averageSpeeds;
  }

  async getLapsTimeByDriver(id: number): Promise<Array<FPLapTimesDto>> {
    this.logger.log('Get All Lap Times In Free Practices By Driver');
    const lapsTimes: Array<FPLapTimesDto> = await this.repo
      .createQueryBuilder('fp')
      .innerJoin('fp.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .where('driver.id = :id', { id })
      .select(['fp.fast_lap', 'fp.fp_number', 'circuit.circuit_name'])
      .orderBy('gp.circuit', 'ASC')
      .getRawMany();

    if (!lapsTimes) {
      throw new BadRequestException('Something went wrong.');
    }
    if (lapsTimes.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return lapsTimes;
  }

  async getPositionsByDriver(id: number): Promise<Array<FPPositionsDto>> {
    this.logger.log('Get All Positions In Free Practices By Driver');
    const positions: Array<FPPositionsDto> = await this.repo
      .createQueryBuilder('fp')
      .innerJoin('fp.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .where('driver.id = :id', { id })
      .select(['circuit.circuit_name', 'fp.position', 'fp.fp_number'])
      .orderBy('gp.circuit', 'ASC')
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
