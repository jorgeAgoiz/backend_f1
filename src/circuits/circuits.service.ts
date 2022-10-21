import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Circuits } from './circuits.entity';
import { CreateCircuitDto } from './dtos/create-circuit.dto';

@Injectable()
export class CircuitsService {
  constructor(@InjectRepository(Circuits) private repo: Repository<Circuits>) {}

  async getAll({ country, mindistance, maxdistance }) {
    const circuits: Array<Circuits> = await this.repo.find({
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
    const circuit: Circuits = await this.repo.findOneBy({ id });
    if (!circuit) {
      throw new Error('Circuit not found');
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
    const newCircuit: Circuits = await this.repo.create({
      gp_name,
      circuit_name,
      location,
      country,
      distance,
    });

    console.log(newCircuit);
    /* return await this.repo.save(newCircuit) */
  }

  async update(id: number, attrs: Partial<Circuits>) {
    const circuit: Circuits = await this.repo.findOneBy({ id });
    if (!circuit) {
      throw new Error('Driver not found');
    }
    console.log(attrs);
    /* return this.repo.save({...circuit, ...attrs}) */
  }

  async delete(id: number) {
    const circuit: Circuits = await this.repo.findOneBy({ id });
    if (!circuit) {
      throw new Error('Driver not found');
    }
    console.log(circuit);
    /* return this.repo.remove(circuit) */
  }
}
