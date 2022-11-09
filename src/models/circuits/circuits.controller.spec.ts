import { Test, TestingModule } from '@nestjs/testing';
import { CircuitsController } from './circuits.controller';
import { CircuitsService } from './circuits.service';
import { CircuitDto } from './dtos/circuit.dto';

describe('CircuitsController', (): void => {
  let controller: CircuitsController;
  const dto: CircuitDto = {
    id: 12,
    gp_name: 'Gp de Francia',
    circuit_name: 'Paul Ricard',
    location: 'Le Castellet',
    country: 'Francia',
    distance: 5.842,
  };

  const mockCircuitService = {
    getAll: jest.fn(() => {
      return [dto, dto, dto];
    }),
    getOneBy: jest.fn(() => {
      return dto;
    }),
  };

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CircuitsController],
      providers: [CircuitsService],
    })
      .overrideProvider(CircuitsService)
      .useValue(mockCircuitService)
      .compile();

    controller = module.get<CircuitsController>(CircuitsController);
  });

  it('should be defined', (): void => {
    expect(controller).toBeDefined();
  });

  it('get multiple circuits', (): void => {
    expect(controller.getCircuits('', '', '')).toHaveLength(3);
    expect(mockCircuitService.getAll).toBeCalled();
  });

  it('get a circuit by ID', (): void => {
    const id = '12';
    expect(controller.getOneCircuitBy(id)).toEqual({
      id: expect.any(Number),
      gp_name: expect.any(String),
      circuit_name: expect.any(String),
      location: expect.any(String),
      country: expect.any(String),
      distance: expect.any(Number),
    });
    expect(mockCircuitService.getOneBy).toHaveBeenCalledWith(12);
  });
});
