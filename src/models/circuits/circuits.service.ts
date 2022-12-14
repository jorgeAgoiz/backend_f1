import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Circuit } from './circuit.entity';
import { CreateCircuitDto } from './dtos/create-circuit.dto';
import { CircuitDto } from './dtos/circuit.dto';
import { UpdateCircuitDto } from './dtos/update-circuit.dto';
import { CircuitGetQueries } from './interfaces/circuit.types';

@Injectable()
export class CircuitsService {
  private readonly logger = new Logger();
  constructor(@InjectRepository(Circuit) private repo: Repository<Circuit>) {}

  async getAll({
    country,
    mindistance,
    maxdistance,
  }: CircuitGetQueries): Promise<Array<CircuitDto>> {
    this.logger.log('Get All Circuits');
    let minDistanceParsed = 0;
    if (mindistance) {
      minDistanceParsed = parseFloat(mindistance);
    }
    let maxDistanceParsed = 100;
    if (maxdistance) {
      maxDistanceParsed = parseFloat(maxdistance);
    }

    const circuits: Array<CircuitDto> = await this.repo.find({
      where: {
        country,
        distance: Between(minDistanceParsed, maxDistanceParsed),
      },
    });
    if (!circuits) {
      throw new NotFoundException('Teams data not found');
    }

    return circuits;
  }

  async getOneBy(id: number): Promise<CircuitDto> {
    this.logger.log('Get A Circuit By ID');
    const circuit: CircuitDto = await this.repo.findOneBy({ id });
    if (!circuit) {
      throw new NotFoundException('Circuit not found');
    }
    return circuit;
  }

  async insert({
    gp_name,
    circuit_name,
    location,
    country,
    distance,
  }: CreateCircuitDto): Promise<CircuitDto> {
    this.logger.log('Insert A Circuit');
    const newCircuit: Circuit = await this.repo.create({
      gp_name,
      circuit_name,
      location,
      country,
      distance,
    });
    if (!newCircuit) {
      throw new BadRequestException('Something went wrong.');
    }

    return await this.repo.save(newCircuit);
  }

  async update(id: number, attrs: UpdateCircuitDto): Promise<CircuitDto> {
    this.logger.log('Update A Circuit');
    const circuit: CircuitDto = await this.repo.findOneBy({ id });
    if (!circuit) {
      throw new NotFoundException('Driver not found');
    }
    return this.repo.save({ ...circuit, ...attrs });
  }

  async delete(id: number): Promise<CircuitDto> {
    this.logger.log('Delete A Circuit');
    const circuit: CircuitDto = await this.repo.findOneBy({ id });
    if (!circuit) {
      throw new NotFoundException('Driver not found');
    }
    return this.repo.remove(circuit);
  }
}
