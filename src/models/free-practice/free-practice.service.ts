import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FreePractice } from './free-practice.entity';
import { AvgSpeedSessions, Response } from './interfaces/avgSpeedByGp.types';
import { FPSByDriver } from './interfaces/free-practice.types';

@Injectable()
export class FreePracticeService {
  constructor(
    @InjectRepository(FreePractice) private repo: Repository<FreePractice>,
  ) {}

  async getAll(): Promise<FreePractice[]> {
    const fps: Array<FreePractice> = await this.repo.find({
      relations: ['grand_prix', 'grand_prix.driver'],
    });
    return fps;
  }

  async getAvgSpeedByGp(id: number): Promise<any> {
    const avgSpeedInfo = await this.repo
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
      .orderBy('gp.id')
      .getRawMany();

    return avgSpeedInfo;
    /*     const freePracticeSessionsGp: Array<FreePractice> =
      await this.repo.find({
      grand_prix: id,
    }); */
    /*     if (!freePracticeSessionsGp || freePracticeSessionsGp.length < 1) {
      throw new NotFoundException('Not data found');
    }
    const avgSpeedFps: Array<AvgSpeedSessions> = freePracticeSessionsGp.map(
      (elem) => {
        return {
          fpNumber: elem.fp_number,
          avgSpeed: parseFloat(elem.average_speed),
        };
      },
    );

    return {
      averageSpeedFps: avgSpeedFps,
      driver: freePracticeSessionsGp[0].grand_prix['driver']['name'],
      circuit: freePracticeSessionsGp[0].grand_prix['circuit']['circuit_name'],
      team: freePracticeSessionsGp[0].grand_prix['team']['name'],
    }; */
  }

  async getAllFpsByDriver(id: number): Promise<Array<FPSByDriver>> {
    const fps: Array<FPSByDriver> = await this.repo
      .createQueryBuilder('fp')
      .innerJoin('fp.grand_prix', 'gp')
      .innerJoinAndSelect('gp.driver', 'driver')
      .innerJoinAndSelect('gp.circuit', 'circuit')
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

    return fps;
  }
}
