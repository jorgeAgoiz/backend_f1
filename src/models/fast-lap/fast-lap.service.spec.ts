import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GrandPrixDto } from '../grand-prix/dtos/grand-prix.dto';
import { FastLapDto } from './dtos/fl.dto';
import { FastLap } from './fast-lap.entity';
import { FastLapService } from './fast-lap.service';

describe('FastLapService', () => {
  let service: FastLapService;
  const gpDto: GrandPrixDto = {
    id: 23,
    circuit: 6,
    driver: 12,
    team: 4,
    year: '2022',
    sprint: false,
  };
  const flDto: FastLapDto = {
    grand_prix: 23,
    fl_session: 'race',
    time: 97261,
    lap: 48,
  };
  const idValues = [12, 6, 4];

  const mockFastLapsRepository = {
    find: jest
      .fn()
      .mockImplementation(() => Promise.resolve([flDto, flDto, flDto])),
    createQueryBuilder: jest.fn(() => ({
      innerJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockImplementation(() => {
        if (idValues.includes(gpDto.driver)) {
          return Promise.resolve([flDto, flDto, flDto]);
        } else {
          return Promise.reject();
        }
      }),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FastLapService,
        {
          provide: getRepositoryToken(FastLap),
          useValue: mockFastLapsRepository,
        },
      ],
    }).compile();

    service = module.get<FastLapService>(FastLapService);
  });

  it('should be defined', (): void => {
    expect(service).toBeDefined();
  });

  it('get all fast laps', async (): Promise<void> => {
    expect(await service.getAll()).toHaveLength(3);
  });

  it('get fast laps by driver ID', async (): Promise<void> => {
    expect(await service.getAllFastLapsByDriver(gpDto.driver)).toEqual([
      flDto,
      flDto,
      flDto,
    ]);
  });

  it('get fast laps by circuit ID', async (): Promise<void> => {
    expect(await service.getAllFastLapsByCircuit(gpDto.circuit)).toEqual([
      flDto,
      flDto,
      flDto,
    ]);
  });

  it('get fast laps by team ID', async (): Promise<void> => {
    expect(await service.getAllFastLapsByTeam(gpDto.team)).toEqual([
      flDto,
      flDto,
      flDto,
    ]);
  });
});
