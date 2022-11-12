import { Test, TestingModule } from '@nestjs/testing';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';
import { DriverDto } from './dtos/driver.dto';

describe('DriversController', (): void => {
  let controller: DriversController;
  const dto: DriverDto = {
    id: 12,
    name: 'Ayrton Senna',
    dorsal_number: 12,
    country: 'Brasil',
    birthday: new Date('1960-03-21'),
    picture:
      'https://soymotor.com/sites/default/files/styles/small/public/imagenes/piloto/ayrton-senna-vertical.jpg',
  };

  const mockDriverService = {
    getAll: jest.fn(() => {
      return [dto, dto, dto];
    }),
    getOneBy: jest.fn((id) => {
      if (dto.id === parseInt(id)) {
        return dto;
      } else {
        return null;
      }
    }),
  };

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriversController],
      providers: [DriversService],
    })
      .overrideProvider(DriversService)
      .useValue(mockDriverService)
      .compile();

    controller = module.get<DriversController>(DriversController);
  });

  it('should be defined', (): void => {
    expect(controller).toBeDefined();
  });

  it('get multiple drivers', (): void => {
    expect(controller.getDrivers('')).toHaveLength(3);
    expect(mockDriverService.getAll).toBeCalled();
  });

  it('get a driver by ID', (): void => {
    const id = '12';
    expect(controller.getOneDriverBy(id)).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      dorsal_number: expect.any(Number),
      country: expect.any(String),
      birthday: expect.any(Date),
      picture: expect.any(String),
    });
    expect(mockDriverService.getOneBy).toHaveBeenCalledWith(12);
  });
});
