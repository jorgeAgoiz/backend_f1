import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOperator } from 'typeorm';
import { FreePractice } from './free-practice.entity';

@Injectable()
export class FreePracticeService {
  constructor(
    @InjectRepository(FreePractice) private repo: Repository<FreePractice>,
  ) {}

  async getAll(): Promise<FreePractice[]> {
    const fps: Array<FreePractice> = await this.repo.find();
    return fps;
  }

  async getAllBy(id: number): Promise<FreePractice[]> {
    const fps: Array<FreePractice> = await this.repo.findBy({
      grand_prix: id,
    });
    if (!fps) {
      throw new NotFoundException('Team not found');
    }

    return fps;
  }
}
