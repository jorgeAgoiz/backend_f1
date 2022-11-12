import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GrandPrixDto } from '../grand-prix/dtos/grand-prix.dto';
import { FreePracticeDto } from './dtos/fp.dto';
import { FreePractice } from './free-practice.entity';
import { FreePracticeService } from './free-practice.service';

describe('FreePracticeService', (): void => {
  let service: FreePracticeService;
  const gpDto: GrandPrixDto = {
    id: 148,
    circuit: 6,
    driver: 12,
    team: 4,
    year: '2022',
    sprint: false,
  };
  const fpDto: FreePracticeDto = {
    grand_prix: 148,
    fp_number: 1,
    position: 5,
    laps: 22,
    fast_lap: 106571,
    average_speed: 202.783,
  };
  const idValues: Array<number> = [12, 6, 4];

  const mockFreePracticesRepository = {
    find: jest
      .fn()
      .mockImplementation(
        (): Promise<Array<FreePracticeDto>> =>
          Promise.resolve([fpDto, fpDto, fpDto]),
      ),
    createQueryBuilder: jest.fn(() => ({
      innerJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getRawMany: jest
        .fn()
        .mockImplementation((): Promise<Array<FreePracticeDto>> => {
          if (idValues.includes(gpDto.driver)) {
            return Promise.resolve([fpDto, fpDto, fpDto]);
          } else {
            return Promise.reject();
          }
        }),
    })),
  };

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FreePracticeService,
        {
          provide: getRepositoryToken(FreePractice),
          useValue: mockFreePracticesRepository,
        },
      ],
    }).compile();

    service = module.get<FreePracticeService>(FreePracticeService);
  });

  it('should be defined', (): void => {
    expect(service).toBeDefined();
  });

  it('get all free practices', async (): Promise<void> => {
    expect(await service.getAll()).toHaveLength(3);
  });

  it('get all free practices by driver ID', async (): Promise<void> => {
    expect(await service.getAllFpsByDriver(gpDto.driver)).toEqual([
      fpDto,
      fpDto,
      fpDto,
    ]);
  });

  it('get all free practices by circuit ID', async (): Promise<void> => {
    expect(await service.getAllFpsByCircuit(gpDto.circuit)).toEqual([
      fpDto,
      fpDto,
      fpDto,
    ]);
  });

  it('get all free practices by team ID', async (): Promise<void> => {
    expect(await service.getAllFpsByDriver(gpDto.team)).toEqual([
      fpDto,
      fpDto,
      fpDto,
    ]);
  });
});
