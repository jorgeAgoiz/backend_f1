import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './driver.entity';

@Injectable()
export class DriversService {
  constructor(@InjectRepository(Driver) private repo: Repository<Driver>) {}

  async getAll(country: string) {
    const drivers: Array<Driver> = await this.repo.find({
      where: { country },
    });
    return drivers;
  }

  async getOneBy(id: number) {
    const driver: Driver = await this.repo.findOneBy({ id });
    if (!driver) {
      throw new NotFoundException('Driver not found');
    }
    return driver;
  }

  async insert({
    name,
    dorsal_number,
    birthday,
    country,
    picture,
  }: Partial<Driver>) {
    const newDriver: Driver = await this.repo.create({
      name,
      dorsal_number,
      birthday,
      country,
      picture,
    });

    return await this.repo.save(newDriver);
  }

  async update(id: number, attrs: Partial<Driver>) {
    const driver: Driver = await this.repo.findOneBy({ id });
    if (!driver) {
      throw new NotFoundException('Driver not found');
    }

    return this.repo.save({ ...driver, ...attrs });
  }

  async remove(id: number) {
    const driver: Driver = await this.repo.findOneBy({ id });
    if (!driver) {
      throw new NotFoundException('Driver not found');
    }

    return await this.repo.remove(driver);
  }
}
