import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SprintDto } from './dtos/sprint.dto';
import { Sprint } from './sprint.entity';

@Injectable()
export class SprintService {
  private readonly logger = new Logger();
  constructor(@InjectRepository(Sprint) private repo: Repository<Sprint>) {}

  async getAll(): Promise<Array<Sprint>> {
    this.logger.log('Get All Sprints');
    const sprintsData: Array<Sprint> = await this.repo.find();

    if (!sprintsData) {
      throw new BadRequestException('Something went wrong.');
    }
    if (sprintsData.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }
    return sprintsData;
  }

  async getAllSprintsByDriver(id: number): Promise<Array<SprintDto>> {
    this.logger.log('Get All Sprints By Driver');
    const sprintsData: Array<SprintDto> = await this.repo
      .createQueryBuilder('sprint')
      .innerJoin('sprint.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .innerJoin('gp.team', 'team')
      .where('driver.id = :id', { id })
      .select([
        'sprint.grand_prix',
        'sprint.position',
        'sprint.laps_disputed',
        'sprint.average_speed',
        'sprint.sprint_points',
        'driver.name',
        'driver.id',
        'circuit.circuit_name',
        'circuit.id',
        'team.name',
        'team.id',
      ])
      .orderBy({
        'circuit.id': 'ASC',
      })
      .getRawMany();

    if (!sprintsData) {
      throw new BadRequestException('Something went wrong.');
    }
    if (sprintsData.length < 1) {
      throw new NotFoundException('Driver data not found.');
    }

    return sprintsData;
  }

  async getAllSprintsByCircuit(id: number): Promise<Array<SprintDto>> {
    this.logger.log('Get All Sprints By Circuit');
    const sprintsData: Array<SprintDto> = await this.repo
      .createQueryBuilder('sprint')
      .innerJoin('sprint.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .innerJoin('gp.team', 'team')
      .where('circuit.id = :id', { id })
      .select([
        'sprint.grand_prix',
        'sprint.position',
        'sprint.laps_disputed',
        'sprint.average_speed',
        'sprint.sprint_points',
        'driver.name',
        'driver.id',
        'circuit.circuit_name',
        'circuit.id',
        'team.name',
        'team.id',
      ])
      .orderBy({
        'sprint.position': 'ASC',
      })
      .getRawMany();

    if (!sprintsData) {
      throw new BadRequestException('Something went wrong.');
    }
    if (sprintsData.length < 1) {
      throw new NotFoundException('Circuit data not found.');
    }

    return sprintsData;
  }

  async getAllSprintsByTeam(id: number): Promise<Array<SprintDto>> {
    this.logger.log('Get All Sprints By Team');
    const sprintsData: Array<SprintDto> = await this.repo
      .createQueryBuilder('sprint')
      .innerJoin('sprint.grand_prix', 'gp')
      .innerJoin('gp.driver', 'driver')
      .innerJoin('gp.circuit', 'circuit')
      .innerJoin('gp.team', 'team')
      .where('team.id = :id', { id })
      .select([
        'sprint.grand_prix',
        'sprint.position',
        'sprint.laps_disputed',
        'sprint.average_speed',
        'sprint.sprint_points',
        'driver.name',
        'driver.id',
        'circuit.circuit_name',
        'circuit.id',
        'team.name',
        'team.id',
      ])
      .orderBy({
        'circuit.id': 'ASC',
      })
      .getRawMany();

    if (!sprintsData) {
      throw new BadRequestException('Something went wrong.');
    }
    if (sprintsData.length < 1) {
      throw new NotFoundException('Team data not found.');
    }

    return sprintsData;
  }
}
