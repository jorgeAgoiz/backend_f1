import { Test, TestingModule } from '@nestjs/testing';
import { GrandPrixDto } from '../grand-prix/dtos/grand-prix.dto';
import { RaceDto } from './dtos/race.dto';
import { RaceController } from './race.controller';
import { RaceService } from './race.service';

describe('RaceController', (): void => {
  let controller: RaceController;
  const gpDto: GrandPrixDto = {
    id: 1,
    circuit: 6,
    driver: 12,
    team: 4,
    year: '2022',
    sprint: false,
  };
  const raceDto: RaceDto = {
    grand_prix: 1,
    position: 19,
    laps_disputed: 54,
    average_speed: 187.792,
    num_pit_stops: 4,
    total_time: 5597696,
    retired: 'Unidad de Potencia',
    race_points: 0,
  };

  const mockRaceService = {
    getAll: jest.fn((): Array<RaceDto> => {
      return [raceDto, raceDto];
    }),
    getAllRacesByDriver: jest.fn((id): Array<RaceDto> => {
      if (gpDto.driver === parseInt(id)) {
        return [raceDto, raceDto];
      } else {
        return null;
      }
    }),
    getAllRacesByCircuit: jest.fn((id): Array<RaceDto> => {
      if (gpDto.circuit === parseInt(id)) {
        return [raceDto, raceDto];
      } else {
        return null;
      }
    }),
    getAllRacesByTeam: jest.fn((id): Array<RaceDto> => {
      if (gpDto.team === parseInt(id)) {
        return [raceDto, raceDto];
      } else {
        return null;
      }
    }),
  };

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RaceController],
      providers: [RaceService],
    })
      .overrideProvider(RaceService)
      .useValue(mockRaceService)
      .compile();

    controller = module.get<RaceController>(RaceController);
  });

  it('should be defined', (): void => {
    expect(controller).toBeDefined();
  });

  it('get all races', (): void => {
    expect(controller.getAllRaces()).toHaveLength(2);
    expect(mockRaceService.getAll).toBeCalled();
  });

  it('get races by driver ID', (): void => {
    const id = '12';
    expect(controller.getAllRacesByDriver(id)).toHaveLength(2);
    expect(mockRaceService.getAllRacesByDriver).toBeCalledWith(parseInt(id));
  });

  it('get races by circuit ID', (): void => {
    const id = '6';
    expect(controller.getAllRacesByCircuit(id)).toHaveLength(2);
    expect(mockRaceService.getAllRacesByCircuit).toBeCalledWith(parseInt(id));
  });

  it('get races by team ID', (): void => {
    const id = '4';
    expect(controller.getAllRacesByTeam(id)).toHaveLength(2);
    expect(mockRaceService.getAllRacesByTeam).toBeCalledWith(parseInt(id));
  });
});
