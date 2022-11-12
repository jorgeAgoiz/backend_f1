import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { DriversService } from './drivers.service';
import { DriverDto } from './dtos/driver.dto';

describe('DriversService', (): void => {
  let service: DriversService;
  const dto: DriverDto = {
    id: 12,
    name: 'Ayrton Senna',
    dorsal_number: 12,
    country: 'Brasil',
    birthday: new Date('1960-03-21'),
    picture:
      'https://soymotor.com/sites/default/files/styles/small/public/imagenes/piloto/ayrton-senna-vertical.jpg',
  };

  const mockDriversRepository = {
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
        DriversService,
        {
          provide: getRepositoryToken(Driver),
          useValue: mockDriversRepository,
        },
      ],
    }).compile();

    service = module.get<DriversService>(DriversService);
  });

  it('should be defined', (): void => {
    expect(service).toBeDefined();
  });

  it('get all drivers', async (): Promise<void> => {
    expect(await service.getAll(null)).toHaveLength(3);
  });

  it('get a driver by ID', async (): Promise<void> => {
    const id = '12';
    expect(await service.getOneBy(parseInt(id))).toEqual(dto);
  });
});
