import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOperator } from 'typeorm';
import { FreePractice } from './free-practice.entity';
import { AvgSpeedSessions, Response } from './interfaces/avgSpeedByGp.types';

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

  async getAvgSpeedByGp(id: number): Promise<Response> {
    const freePracticeSessionsGp: Array<FreePractice> = await this.repo.findBy({
      grand_prix: id,
    });
    if (!freePracticeSessionsGp || freePracticeSessionsGp.length < 1) {
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
    };
  }
}
