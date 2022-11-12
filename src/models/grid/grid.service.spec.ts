import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GrandPrixDto } from '../grand-prix/dtos/grand-prix.dto';
import { GridDto } from './dtos/grid.dto';
import { Grid } from './grid.entity';
import { GridService } from './grid.service';

describe('GridService', (): void => {
  let service: GridService;
  const gpDto: GrandPrixDto = {
    id: 148,
    circuit: 6,
    driver: 12,
    team: 4,
    year: '2022',
    sprint: false,
  };
  const gridDto: GridDto = {
    grand_prix: 12,
    position: 3,
    type_grid: 'race',
  };
  const idValues: Array<number> = [12, 6, 4];

  const mockGridRepository = {
    find: jest
      .fn()
      .mockImplementation(
        (): Promise<Array<GridDto>> =>
          Promise.resolve([gridDto, gridDto, gridDto]),
      ),
    findBy: jest
      .fn()
      .mockImplementation(({ type_grid }): Promise<Array<GridDto>> => {
        if (gridDto.type_grid === type_grid) {
          return Promise.resolve([gridDto, gridDto, gridDto]);
        } else {
          return Promise.reject(null);
        }
      }),
    createQueryBuilder: jest.fn(() => ({
      innerJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockImplementation((): Promise<Array<GridDto>> => {
        if (idValues.includes(gpDto.driver)) {
          return Promise.resolve([gridDto, gridDto, gridDto]);
        } else {
          return Promise.reject();
        }
      }),
    })),
  };

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GridService,
        {
          provide: getRepositoryToken(Grid),
          useValue: mockGridRepository,
        },
      ],
    }).compile();

    service = module.get<GridService>(GridService);
  });

  it('should be defined', (): void => {
    expect(service).toBeDefined();
  });

  it('get all grids', async (): Promise<void> => {
    expect(await service.getAll()).toHaveLength(3);
  });

  it('get all grids by type', async (): Promise<void> => {
    const type = 'race';
    expect(await service.getAllGridsByType(type)).toHaveLength(3);
  });

  it('get all grids by driver ID', async (): Promise<void> => {
    expect(await service.getAllGridsByDriver(gpDto.driver)).toHaveLength(3);
  });

  it('get all grids by circuit ID', async (): Promise<void> => {
    expect(await service.getAllGridsByCircuit(gpDto.circuit)).toHaveLength(3);
  });

  it('get all grids by team ID', async (): Promise<void> => {
    expect(await service.getAllGridsByTeam(gpDto.team)).toHaveLength(3);
  });
});
