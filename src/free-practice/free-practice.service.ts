import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FreePractice } from './free-practice.entity';

@Injectable()
export class FreePracticeService {
  constructor(
    @InjectRepository(FreePractice) private repo: Repository<FreePractice>,
  ) {}

  async getAll() {
    const fps: Array<FreePractice> = await this.repo.find();
    return fps;
  }
}
