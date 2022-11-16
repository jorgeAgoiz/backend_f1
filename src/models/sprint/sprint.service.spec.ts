import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GrandPrixDto } from '../grand-prix/dtos/grand-prix.dto';
import { SprintDto } from './dtos/sprint.dto';
import { Sprint } from './sprint.entity';
import { SprintService } from './sprint.service';

describe('SprintService', (): void => {
  let service: SprintService;
  const gpDto: GrandPrixDto = {
    id: 23,
    circuit: 6,
    driver: 12,
    team: 4,
    year: '2022',
    sprint: false,
  };
  const sprintDto: SprintDto = {
    grand_prix: 23,
    position: 1,
    laps_disputed: 21,
    average_speed: 201.316,
    sprint_points: 8,
  };
  const idValues: Array<number> = [12, 6, 4];

  const mockSprintRepository = {
    find: jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve([sprintDto, sprintDto, sprintDto]),
      ),
    createQueryBuilder: jest.fn(() => ({
      innerJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockImplementation(() => {
        if (idValues.includes(gpDto.driver)) {
          return Promise.resolve([sprintDto, sprintDto]);
        } else {
          return Promise.reject();
        }
      }),
    })),
  };

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SprintService,
        {
          provide: getRepositoryToken(Sprint),
          useValue: mockSprintRepository,
        },
      ],
    }).compile();

    service = module.get<SprintService>(SprintService);
  });

  it('should be defined', (): void => {
    expect(service).toBeDefined();
  });

  it('get all sprints', async (): Promise<void> => {
    expect(await service.getAll()).toHaveLength(3);
  });

  it('get all sprints by driver ID', async (): Promise<void> => {
    expect(await service.getAllSprintsByDriver(gpDto.driver)).toEqual([
      sprintDto,
      sprintDto,
    ]);
  });

  it('get all sprints by circuit ID', async (): Promise<void> => {
    expect(await service.getAllSprintsByCircuit(gpDto.circuit)).toEqual([
      sprintDto,
      sprintDto,
    ]);
  });

  it('get all sprints by team ID', async (): Promise<void> => {
    expect(await service.getAllSprintsByTeam(gpDto.team)).toEqual([
      sprintDto,
      sprintDto,
    ]);
  });
});
