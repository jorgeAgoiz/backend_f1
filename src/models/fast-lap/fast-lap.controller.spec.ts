import { Test, TestingModule } from '@nestjs/testing';
import { GrandPrixDto } from '../grand-prix/dtos/grand-prix.dto';
import { FastLapDto } from './dtos/fl.dto';
import { FastLapController } from './fast-lap.controller';
import { FastLapService } from './fast-lap.service';

describe('FastLapController', (): void => {
  let controller: FastLapController;

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

  const mockFastLapService = {
    getAll: jest.fn(() => {
      return [flDto, flDto, flDto];
    }),
    getAllFastLapsByDriver: jest.fn((id) => {
      if (gpDto.driver === parseInt(id)) {
        return [flDto, flDto, flDto, flDto, flDto];
      } else {
        return null;
      }
    }),
    getAllFastLapsByCircuit: jest.fn((id) => {
      if (gpDto.circuit === parseInt(id)) {
        return [flDto, flDto, flDto, flDto, flDto];
      } else {
        return null;
      }
    }),
    getAllFastLapsByTeam: jest.fn((id) => {
      if (gpDto.team === parseInt(id)) {
        return [flDto, flDto, flDto, flDto, flDto];
      } else {
        return null;
      }
    }),
  };

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FastLapController],
      providers: [FastLapService],
    })
      .overrideProvider(FastLapService)
      .useValue(mockFastLapService)
      .compile();

    controller = module.get<FastLapController>(FastLapController);
  });

  it('should be defined', (): void => {
    expect(controller).toBeDefined();
  });

  it('get all fast laps', (): void => {
    expect(controller.getFastLaps(null)).toHaveLength(3);
    expect(mockFastLapService.getAll).toBeCalled();
  });

  it('get all fast laps by driver ID', (): void => {
    const id = '12';
    expect(controller.getAllFastLapsByDriver(id)).toHaveLength(5);
    expect(mockFastLapService.getAllFastLapsByDriver).toHaveBeenCalledWith(
      parseInt(id),
    );
  });

  it('get all fast laps by circuit ID', (): void => {
    const id = '6';
    expect(controller.getAllFastLapsByCircuit(id)).toHaveLength(5);
    expect(mockFastLapService.getAllFastLapsByCircuit).toHaveBeenCalledWith(
      parseInt(id),
    );
  });

  it('get all fast laps by team ID', (): void => {
    const id = '4';
    expect(controller.getAllFastLapsByTeam(id)).toHaveLength(5);
    expect(mockFastLapService.getAllFastLapsByTeam).toHaveBeenCalledWith(
      parseInt(id),
    );
  });
});
