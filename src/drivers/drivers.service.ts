import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Drivers } from './drivers.entity';

@Injectable()
export class DriversService {
  constructor(@InjectRepository(Drivers) private repo: Repository<Drivers>) {}

  async get() {
    const drivers: Array<Drivers> = await this.repo.find();
    return drivers;
  }
}
