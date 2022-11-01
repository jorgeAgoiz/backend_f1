import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FreePractice } from './free-practice.entity';
import {
  AVGSpeedByDriver,
  FPSByDriver,
  LapsTimeByDriver,
  PositionsByDriver,
} from './interfaces/free-practice.types';

@Injectable()
export class FreePracticeService {
  constructor(
    @InjectRepository(FreePractice) private repo: Repository<FreePractice>,
  ) {}

  async getAll(): Promise<Array<FreePractice>> {
    const fps: Array<FreePractice> = await this.repo.find();
    return fps;
  }

  async getAllFpsByDriver(id: number): Promise<Array<FPSByDriver>> {
    const fpsData: Array<FPSByDriver> = await this.repo
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
      .getRawMany();
    if (!fpsData || fpsData.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return fpsData;
  }

  async getAllFpsByCircuit(id: number): Promise<Array<FPSByDriver>> {
    const fpsData: Array<FPSByDriver> = await this.repo
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
        'fp.fp_number': 'ASC',
        'fp.position': 'ASC',
      })
      .getRawMany();
    if (!fpsData || fpsData.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return fpsData;
  }

  async getAllFpsByTeam(id: number): Promise<Array<FPSByDriver>> {
    const fpsData: Array<FPSByDriver> = await this.repo
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
        'fp.fp_number': 'ASC',
        'fp.position': 'ASC',
      })
      .getRawMany();
    if (!fpsData || fpsData.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return fpsData;
  }

  async getAvgSpeedByDriver(id: number): Promise<Array<AVGSpeedByDriver>> {
    const avgSpeedInfo: Array<AVGSpeedByDriver> = await this.repo
      .createQueryBuilder('fp')
      .innerJoin('fp.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .where('driver.id = :id', { id })
      .select(['fp.average_speed', 'fp.fp_number', 'circuit.circuit_name'])
      .getRawMany();
    if (!avgSpeedInfo || avgSpeedInfo.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return avgSpeedInfo;
  }

  async getLapsTimeByDriver(id: number): Promise<Array<LapsTimeByDriver>> {
    const lapsTimes: Array<LapsTimeByDriver> = await this.repo
      .createQueryBuilder('fp')
      .innerJoin('fp.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .where('driver.id = :id', { id })
      .select(['fp.fast_lap', 'fp.fp_number', 'circuit.circuit_name'])
      .orderBy('gp.circuit', 'ASC')
      .getRawMany();
    if (!lapsTimes || lapsTimes.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return lapsTimes;
  }

  async getPositionsByDriver(id: number): Promise<Array<PositionsByDriver>> {
    const positionInfo: Array<PositionsByDriver> = await this.repo
      .createQueryBuilder('fp')
      .innerJoin('fp.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .where('driver.id = :id', { id })
      .select(['circuit.circuit_name', 'fp.position', 'fp.fp_number'])
      .orderBy('gp.circuit', 'ASC')
      .getRawMany();
    if (!positionInfo || positionInfo.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return positionInfo;
  }
}
