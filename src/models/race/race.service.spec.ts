import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GrandPrixDto } from '../grand-prix/dtos/grand-prix.dto';
import { RaceDto } from './dtos/race.dto';
import { Race } from './race.entity';
import { RaceService } from './race.service';

describe('RaceService', (): void => {
  let service: RaceService;
  const gpDto: GrandPrixDto = {
    id: 1,
    circuit: 6,
    driver: 12,
    team: 4,
    year: '2022',
    sprint: false,
  };
  const raceDto: RaceDto = {
    grand_prix: 1,
    position: 19,
    laps_disputed: 54,
    average_speed: 187.792,
    num_pit_stops: 4,
    total_time: 5597696,
    retired: 'Unidad de Potencia',
    race_points: 0,
  };
  const idValues: Array<number> = [12, 6, 4];

  const mockRacesRepository = {
    find: jest
      .fn()
      .mockImplementation(() => Promise.resolve([raceDto, raceDto])),
    createQueryBuilder: jest.fn(() => ({
      innerJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockImplementation(() => {
        if (idValues.includes(gpDto.driver)) {
          return Promise.resolve([raceDto, raceDto]);
        } else {
          return Promise.reject();
        }
      }),
    })),
  };

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RaceService,
        {
          provide: getRepositoryToken(Race),
          useValue: mockRacesRepository,
        },
      ],
    }).compile();

    service = module.get<RaceService>(RaceService);
  });

  it('should be defined', (): void => {
    expect(service).toBeDefined();
  });

  it('get all races', async (): Promise<void> => {
    expect(await service.getAll()).toHaveLength(2);
  });

  it('get all races by driver ID', async (): Promise<void> => {
    expect(await service.getAllRacesByDriver(gpDto.driver)).toEqual([
      raceDto,
      raceDto,
    ]);
  });

  it('get all races by circuit ID', async (): Promise<void> => {
    expect(await service.getAllRacesByCircuit(gpDto.circuit)).toEqual([
      raceDto,
      raceDto,
    ]);
  });

  it('get all races by team ID', async (): Promise<void> => {
    expect(await service.getAllRacesByTeam(gpDto.team)).toEqual([
      raceDto,
      raceDto,
    ]);
  });
});
