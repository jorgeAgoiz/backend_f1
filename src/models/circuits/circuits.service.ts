import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Circuit } from './circuit.entity';
import { CreateCircuitDto } from './dtos/create-circuit.dto';

@Injectable()
export class CircuitsService {
  constructor(@InjectRepository(Circuit) private repo: Repository<Circuit>) {}

  async getAll({ country, mindistance, maxdistance }) {
    const circuits: Array<Circuit> = await this.repo.find({
      where: { country },
    });

    // CON ESTO HAY QUE HACER ALGO PARA PASARLO COMO FILTROS A LA QUERY
    const minDistanceParsed = parseFloat(mindistance);
    const maxDistanceParsed = parseFloat(maxdistance);
    console.log({ minDistanceParsed, maxDistanceParsed });
    // CON ESTO HAY QUE HACER ALGO PARA PASARLO COMO FILTROS A LA QUERY
    return circuits;
  }

  async getOneBy(id: number) {
    const circuit: Circuit = await this.repo.findOneBy({ id });
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
  }: CreateCircuitDto) {
    const newCircuit: Circuit = await this.repo.create({
      gp_name,
      circuit_name,
      location,
      country,
      distance,
    });

    console.log(newCircuit);
    /* return await this.repo.save(newCircuit) */
  }

  async update(id: number, attrs: Partial<Circuit>) {
    const circuit: Circuit = await this.repo.findOneBy({ id });
    if (!circuit) {
      throw new NotFoundException('Driver not found');
    }
    console.log(attrs);
    /* return this.repo.save({...circuit, ...attrs}) */
  }

  async delete(id: number) {
    const circuit: Circuit = await this.repo.findOneBy({ id });
    if (!circuit) {
      throw new NotFoundException('Driver not found');
    }
    console.log(circuit);
    /* return this.repo.remove(circuit) */
  }
}
