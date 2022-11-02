import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  AVGSpeedByDriver,
  LapsTimeByDriver,
  Qualify,
  PositionsByDriver,
} from './interfaces/qualifying.types';
import { Qualifying } from './qualifying.entity';

@Injectable()
export class QualifyingService {
  constructor(
    @InjectRepository(Qualifying) private repo: Repository<Qualifying>,
  ) {}

  async getAll(): Promise<Array<Qualifying>> {
    const qfSessions: Array<Qualifying> = await this.repo.find();
    return qfSessions;
  }

  async getAllQfByDriver(id: number): Promise<Array<Qualify>> {
    const qfData: Array<Qualify> = await this.repo
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
    if (!qfData || qfData.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return qfData;
  }

  async getAllQfByCircuit(id: number): Promise<Array<Qualify>> {
    const qfData: Array<Qualify> = await this.repo
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
    if (!qfData || qfData.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return qfData;
  }

  async getAllQfByTeam(id: number): Promise<Array<Qualify>> {
    const qfData: Array<Qualify> = await this.repo
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
    if (!qfData || qfData.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return qfData;
  }

  async getAvgSpeedByDriver(id: number): Promise<Array<AVGSpeedByDriver>> {
    const avgSpeedInfo: Array<AVGSpeedByDriver> = await this.repo
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
    if (!avgSpeedInfo || avgSpeedInfo.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return avgSpeedInfo;
  }

  async getLapsTimeByDriver(id: number): Promise<Array<LapsTimeByDriver>> {
    const lapsTimes: Array<LapsTimeByDriver> = await this.repo
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
    if (!lapsTimes || lapsTimes.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return lapsTimes;
  }

  async getPositionsByDriver(id: number): Promise<Array<PositionsByDriver>> {
    const positionInfo: Array<PositionsByDriver> = await this.repo
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
    if (!positionInfo || positionInfo.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return positionInfo;
  }
}
