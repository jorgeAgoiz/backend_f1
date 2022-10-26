import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GrandPrix } from './grand-prix.entity';

@Injectable()
export class GrandPrixService {
  constructor(
    @InjectRepository(GrandPrix) private repo: Repository<GrandPrix>,
  ) {}

  async getAll() {
    const grandPrixs: Array<GrandPrix> = await this.repo.find({
      loadRelationIds: true,
    });
    return grandPrixs;
  }
}
