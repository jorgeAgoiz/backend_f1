import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Teams } from './teams.entity';

@Injectable()
export class TeamsService {
  constructor(@InjectRepository(Teams) private repo: Repository<Teams>) {}

  async get() {
    return await this.repo.find();
  }
}
