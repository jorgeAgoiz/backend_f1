import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Circuit } from './circuit.entity';
import { CircuitsService } from './circuits.service';
import { CircuitDto } from './dtos/circuit.dto';

describe('CircuitsService', () => {
  let service: CircuitsService;
  const dto: CircuitDto = {
    id: 12,
    gp_name: 'Gp de Francia',
    circuit_name: 'Paul Ricard',
    location: 'Le Castellet',
    country: 'Francia',
    distance: 5.842,
  };

  const mockCircuitsRepository = {
    find: jest.fn().mockImplementation(() => Promise.resolve([dto, dto, dto])),
    findOneBy: jest.fn().mockImplementation(({ id }) => {
      if (dto.id === id) {
        return Promise.resolve(dto);
      } else {
        return Promise.reject();
      }
    }),
  };

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CircuitsService,
        {
          provide: getRepositoryToken(Circuit),
          useValue: mockCircuitsRepository,
        },
      ],
    }).compile();

    service = module.get<CircuitsService>(CircuitsService);
  });

  it('should be defined', (): void => {
    expect(service).toBeDefined();
  });

  it('get all circuits', async (): Promise<void> => {
    expect(
      await service.getAll({
        country: null,
        mindistance: null,
        maxdistance: null,
      }),
    ).toHaveLength(3);
  });

  it('get a circuit by ID', async (): Promise<void> => {
    const id = '12';
    expect(await service.getOneBy(parseInt(id))).toEqual(dto);
  });
});
