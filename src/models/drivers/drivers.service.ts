import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { DriverDto } from './dtos/driver.dto';
import { CreateDriverDto } from './dtos/create-driver.dto';
import { UpdateDriverDto } from './dtos/update-driver.dto';

@Injectable()
export class DriversService {
  private readonly logger = new Logger();
  constructor(@InjectRepository(Driver) private repo: Repository<Driver>) {}

  async getAll(country: string): Promise<Array<DriverDto>> {
    this.logger.log('Get All Drivers');
    const drivers: Array<DriverDto> = await this.repo.find({
      where: { country },
    });
    if (!drivers) {
      throw new NotFoundException('Driver data not found.');
    }
    return drivers;
  }

  async getOneBy(id: number): Promise<DriverDto> {
    this.logger.log('Get A Driver By ID');
    const driver: DriverDto = await this.repo.findOneBy({ id });
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
  }: CreateDriverDto): Promise<DriverDto> {
    this.logger.log('Insert A Driver');
    const newDriver: Driver = await this.repo.create({
      name,
      dorsal_number,
      birthday,
      country,
      picture,
    });
    if (!newDriver) {
      throw new BadRequestException('Something went wrong.');
    }
    return await this.repo.save(newDriver);
  }

  async update(id: number, attrs: UpdateDriverDto): Promise<DriverDto> {
    this.logger.log('Update A Driver');
    const driver: DriverDto = await this.repo.findOneBy({ id });
    if (!driver) {
      throw new NotFoundException('Driver not found');
    }
    return this.repo.save({ ...driver, ...attrs });
  }

  async remove(id: number): Promise<DriverDto> {
    this.logger.log('Delete A Driver');
    const driver: DriverDto = await this.repo.findOneBy({ id });
    if (!driver) {
      throw new NotFoundException('Driver not found');
    }
    return await this.repo.remove(driver);
  }
}
