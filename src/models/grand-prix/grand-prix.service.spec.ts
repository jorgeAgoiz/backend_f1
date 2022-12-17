import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RacePosition } from './dtos/gp-best-results.dto';
import { GrandPrix } from './grand-prix.entity';
import { GrandPrixService } from './grand-prix.service';

describe('GrandPrixService', (): void => {
  let service: GrandPrixService;

  const victories: Array<RacePosition> = [
    {
      driver_name: 'Max Verstappen',
      circuit_gp_name: 'GP de Arabia Saudí',
      race_position: 1,
    },
  ];

  const idValues: Array<number> = [1, 8, 7];
  const idToTest = 1;

  const mockGrandPrixRepository = {
    findOne: jest
      .fn()
      .mockImplementation((): Promise<number> => Promise.resolve(idToTest)),
    createQueryBuilder: jest.fn(() => ({
      innerJoin: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockImplementation((): Promise<any> => {
        if (idValues.includes(idToTest)) {
          return Promise.resolve(victories);
        } else {
          return Promise.reject();
        }
      }),
    })),
  };

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GrandPrixService,
        {
          provide: getRepositoryToken(GrandPrix),
          useValue: mockGrandPrixRepository,
        },
      ],
    }).compile();

    service = module.get<GrandPrixService>(GrandPrixService);
  });

  it('should be defined', (): void => {
    expect(service).toBeDefined();
  });

  it('get best results (Victories, podiums and pole positions) by driver ID', async (): Promise<any> => {
    expect(await service.getBestResultsByDriverId(idToTest)).toEqual({
      victories,
      podiums: victories,
      polePositions: victories,
    });
  });
});
