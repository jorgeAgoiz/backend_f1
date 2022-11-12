import { Test, TestingModule } from '@nestjs/testing';
import { GrandPrixDto } from '../grand-prix/dtos/grand-prix.dto';
import { QFAvgSpeedDto } from './dtos/qf-avg-speed.dto';
import { QFLapsDto } from './dtos/qf-laps.dto';
import { QFPositionsDto } from './dtos/qf-positions-by.dto';
import { QualifyingDto } from './dtos/qualifying.dto';
import { QualifyingController } from './qualifying.controller';
import { QualifyingService } from './qualifying.service';

describe('QualifyingController', (): void => {
  let controller: QualifyingController;
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
  const qfAvgSpeedDto: QFAvgSpeedDto = {
    circuit_circuit_name: 'Barcelona-Catalunya',
    qf_average_speed: 212.657,
    qf_qf_number: 3,
  };
  const qfLapTimesDto: QFLapsDto = {
    circuit_circuit_name: 'Barcelona-Catalunya',
    qf_fast_lap: 91344,
    qf_qf_number: 3,
  };
  const qfPositionsDto: QFPositionsDto = {
    circuit_circuit_name: 'Barcelona-Catalunya',
    qf_qf_number: 3,
    qf_position: 9,
  };
  const driverId = '12';
  const circuitId = '6';
  const teamId = '4';

  const mockQualifyingService = {
    getAll: jest.fn((): Array<QualifyingDto> => {
      return [qfDto, qfDto, qfDto];
    }),
    getAllQfByDriver: jest.fn((id): Array<QualifyingDto> => {
      if (gpDto.driver === parseInt(id)) {
        return [qfDto, qfDto, qfDto];
      } else {
        return null;
      }
    }),
    getAllQfByCircuit: jest.fn((id): Array<QualifyingDto> => {
      if (gpDto.circuit === parseInt(id)) {
        return [qfDto, qfDto, qfDto];
      } else {
        return null;
      }
    }),
    getAllQfByTeam: jest.fn((id): Array<QualifyingDto> => {
      if (gpDto.team === parseInt(id)) {
        return [qfDto, qfDto, qfDto];
      } else {
        return null;
      }
    }),
    getAvgSpeedByDriver: jest.fn((id): Array<QFAvgSpeedDto> => {
      if (gpDto.driver === parseInt(id)) {
        return [qfAvgSpeedDto, qfAvgSpeedDto, qfAvgSpeedDto];
      } else {
        return null;
      }
    }),
    getLapsTimeByDriver: jest.fn((id): Array<QFLapsDto> => {
      if (gpDto.driver === parseInt(id)) {
        return [qfLapTimesDto, qfLapTimesDto, qfLapTimesDto];
      } else {
        return null;
      }
    }),
    getPositionsByDriver: jest.fn((id): Array<QFPositionsDto> => {
      if (gpDto.driver === parseInt(id)) {
        return [qfPositionsDto, qfPositionsDto, qfPositionsDto];
      } else {
        return null;
      }
    }),
  };

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QualifyingController],
      providers: [QualifyingService],
    })
      .overrideProvider(QualifyingService)
      .useValue(mockQualifyingService)
      .compile();

    controller = module.get<QualifyingController>(QualifyingController);
  });

  it('should be defined', (): void => {
    expect(controller).toBeDefined();
  });

  it('get all qualifying sessions', (): void => {
    expect(controller.getQualifyings()).toHaveLength(3);
    expect(mockQualifyingService.getAll).toBeCalled();
  });

  it('get all qualifying sessions by driver ID', (): void => {
    expect(controller.getQualifyingsByDriver(driverId)).toHaveLength(3);
    expect(mockQualifyingService.getAllQfByDriver).toBeCalledWith(
      parseInt(driverId),
    );
  });

  it('get all qualifying sessions by circuit ID', (): void => {
    expect(controller.getQualifyingsByCircuit(circuitId)).toHaveLength(3);
    expect(mockQualifyingService.getAllQfByCircuit).toBeCalledWith(
      parseInt(circuitId),
    );
  });

  it('get all qualifying sessions by team ID', (): void => {
    expect(controller.getQualifyingsByTeam(teamId)).toHaveLength(3);
    expect(mockQualifyingService.getAllQfByTeam).toBeCalledWith(
      parseInt(teamId),
    );
  });

  it('get average speed of each qualifying sessions by driver ID', (): void => {
    expect(
      controller.getAverageSpeedQualifyingsByDriver(driverId),
    ).toHaveLength(3);
    expect(mockQualifyingService.getAvgSpeedByDriver).toBeCalledWith(
      parseInt(driverId),
    );
  });

  it('get lap times of each qualifying sessions by driver ID', (): void => {
    expect(controller.getLapsTimeByDriver(driverId)).toHaveLength(3);
    expect(mockQualifyingService.getLapsTimeByDriver).toBeCalledWith(
      parseInt(driverId),
    );
  });

  it('get positions of each qualifying sessions by driver ID', (): void => {
    expect(controller.getPositionsByDriver(driverId)).toHaveLength(3);
    expect(mockQualifyingService.getPositionsByDriver).toBeCalledWith(
      parseInt(driverId),
    );
  });
});
