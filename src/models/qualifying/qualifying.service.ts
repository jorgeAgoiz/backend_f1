import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
