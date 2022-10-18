import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Circuits } from './circuits.entity';

@Injectable()
export class CircuitsService {
  constructor(@InjectRepository(Circuits) private repo: Repository<Circuits>) {}

  async get() {
    const circuits: Array<Circuits> = await this.repo.find();
    return circuits;
  }
}
