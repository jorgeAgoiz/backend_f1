import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Drivers } from './drivers.entity';

@Injectable()
export class DriversService {
  constructor(@InjectRepository(Drivers) private repo: Repository<Drivers>) {}

  async getAll(country: string) {
    const drivers: Array<Drivers> = await this.repo.find({
      where: { country },
    });
    return drivers;
  }

  async getOneBy(id: number) {
    const driver: Drivers = await this.repo.findOneBy({ id });
    if (!driver) {
      throw new Error('Driver not found');
    }
    return driver;
  }

  async insert({
    name,
    dorsal_number,
    birthday,
    country,
    picture,
  }: Partial<Drivers>) {
    const newDriver: Drivers = await this.repo.create({
      name,
      dorsal_number,
      birthday,
      country,
      picture,
    });

    console.log(newDriver);
    /* return await this.repo.save(newDriver) */
  }

  async update(id: number, attrs: Partial<Drivers>) {
    const driver: Drivers = await this.repo.findOneBy({ id });
    if (!driver) {
      throw new Error('Driver not found');
    }
    console.log(attrs);
    /* return this.repo.save({ ...driver, ...attrs }) */
  }

  async remove(id: number) {
    const driver: Drivers = await this.repo.findOneBy({ id });
    if (!driver) {
      throw new Error('Driver not found');
    }
    console.log(driver);
    /* return await this.repo.remove(driver) */
  }
}
