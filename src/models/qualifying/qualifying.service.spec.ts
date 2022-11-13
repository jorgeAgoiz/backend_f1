import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GrandPrixDto } from '../grand-prix/dtos/grand-prix.dto';
import { QualifyingDto } from './dtos/qualifying.dto';
import { Qualifying } from './qualifying.entity';
import { QualifyingService } from './qualifying.service';

describe('QualifyingService', () => {
  let service: QualifyingService;
  const gpDto: GrandPrixDto = {
    id: 23,
    circuit: 6,
    driver: 12,
    team: 4,
    year: '2022',
    sprint: false,
  };
  const qfDto: QualifyingDto = {
    grand_prix: 23,
    qf_number: 3,
    position: 8,
    laps: 14,
    fast_lap: 91768,
    average_speed: 212.269,
  };
  const idValues: Array<number> = [12, 6, 4];

  const mockGridsRepository = {
    find: jest
      .fn()
      .mockImplementation(() => Promise.resolve([qfDto, qfDto, qfDto])),
    createQueryBuilder: jest.fn(() => ({
      innerJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockImplementation(() => {
        if (idValues.includes(gpDto.driver)) {
          return Promise.resolve([qfDto, qfDto]);
        } else {
          return Promise.reject();
        }
      }),
    })),
  };

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QualifyingService,
        {
          provide: getRepositoryToken(Qualifying),
          useValue: mockGridsRepository,
        },
      ],
    }).compile();

    service = module.get<QualifyingService>(QualifyingService);
  });

  it('should be defined', (): void => {
    expect(service).toBeDefined();
  });

  it('get all grids', async (): Promise<void> => {
    expect(await service.getAll()).toHaveLength(3);
  });

  it('get qualifying sessions by driver ID', async (): Promise<void> => {
    expect(await service.getAllQfByDriver(gpDto.driver)).toEqual([
      qfDto,
      qfDto,
    ]);
  });

  it('get qualifying sessions by circuit ID', async (): Promise<void> => {
    expect(await service.getAllQfByDriver(gpDto.circuit)).toEqual([
      qfDto,
      qfDto,
    ]);
  });

  it('get qualifying sessions by team ID', async (): Promise<void> => {
    expect(await service.getAllQfByDriver(gpDto.team)).toEqual([qfDto, qfDto]);
  });

  // No devuelven los mismos datos que los repositorios reales
  it('get average speeds of each qualifying session by driver ID', async (): Promise<void> => {
    expect(await service.getAvgSpeedByDriver(gpDto.driver)).toEqual([
      qfDto,
      qfDto,
    ]);
  });

  it('get lap times of each qualifying session by driver ID', async (): Promise<void> => {
    expect(await service.getLapsTimeByDriver(gpDto.driver)).toEqual([
      qfDto,
      qfDto,
    ]);
  });

  it('get positions of each qualifying session by driver ID', async (): Promise<void> => {
    expect(await service.getPositionsByDriver(gpDto.driver)).toEqual([
      qfDto,
      qfDto,
    ]);
  });
  // No devuelven los mismos datos que los repositorios reales
});
