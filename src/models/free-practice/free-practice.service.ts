import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { fastLapStringToMiliseconds } from 'src/common/helpers/dates.helpers';
import { Repository } from 'typeorm';
import { FreePractice } from './free-practice.entity';
import {
  AVGSpeedByDriver,
  FLByDriverAndCircuitReq,
  FLByDriverAndCircuitRes,
  FPSByDriver,
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

  async getAvgSpeedByDriver(id: number): Promise<Array<AVGSpeedByDriver>> {
    const avgSpeedInfo: Array<AVGSpeedByDriver> = await this.repo
      .createQueryBuilder('fp')
      .leftJoin('fp.grand_prix', 'gp')
      .leftJoin('gp.driver', 'driver')
      .leftJoin('gp.circuit', 'circuit')
      .where('driver.id = :id', { id })
      .select([
        'fp.grand_prix',
        'fp.fp_number',
        'fp.average_speed',
        'driver.name',
        'driver.id',
        'circuit.circuit_name',
        'circuit.id',
      ])
      .getRawMany();
    if (!avgSpeedInfo || avgSpeedInfo.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return avgSpeedInfo;
  }

  async getAllFpsByDriver(id: number): Promise<Array<FPSByDriver>> {
    const fpsData: Array<FPSByDriver> = await this.repo
      .createQueryBuilder('fp')
      .innerJoin('fp.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
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
      ])
      .getRawMany();
    if (!fpsData || fpsData.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return fpsData;
  }

  async getFastLapsByDriverAndCircuit({
    driverId,
    circuitId,
  }: FLByDriverAndCircuitReq): Promise<Array<FLByDriverAndCircuitRes>> {
    const fastLaps: Array<FLByDriverAndCircuitRes> = await this.repo
      .createQueryBuilder('fp')
      .leftJoin('fp.grand_prix', 'gp')
      .leftJoin('gp.driver', 'driver')
      .leftJoin('gp.circuit', 'circuit')
      .where('driver.id = :driverId', { driverId })
      .andWhere('circuit.id = :circuitId', { circuitId })
      .select(['fp.fast_lap', 'circuit.circuit_name'])
      .orderBy('fp.fast_lap')
      .getRawMany();
    if (!fastLaps || fastLaps.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return fastLaps;
  }
}
