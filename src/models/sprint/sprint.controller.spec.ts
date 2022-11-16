import { Test, TestingModule } from '@nestjs/testing';
import { GrandPrixDto } from '../grand-prix/dtos/grand-prix.dto';
import { SprintDto } from './dtos/sprint.dto';
import { SprintController } from './sprint.controller';
import { SprintService } from './sprint.service';

describe('SprintController', (): void => {
  let controller: SprintController;
  const gpDto: GrandPrixDto = {
    id: 23,
    circuit: 6,
    driver: 12,
    team: 4,
    year: '2022',
    sprint: false,
  };
  const sprintDto: SprintDto = {
    grand_prix: 23,
    position: 1,
    laps_disputed: 21,
    average_speed: 201.316,
    sprint_points: 8,
  };
  const driverId = '12';
  const circuitId = '6';
  const teamId = '4';

  const mockSprintService = {
    getAll: jest.fn((): Array<SprintDto> => {
      return [sprintDto, sprintDto, sprintDto];
    }),
    getAllSprintsByDriver: jest.fn((id): Array<SprintDto> => {
      if (gpDto.driver === parseInt(id)) {
        return [sprintDto, sprintDto, sprintDto];
      } else {
        return null;
      }
    }),
    getAllSprintsByCircuit: jest.fn((id): Array<SprintDto> => {
      if (gpDto.circuit === parseInt(id)) {
        return [sprintDto, sprintDto, sprintDto];
      } else {
        return null;
      }
    }),
    getAllSprintsByTeam: jest.fn((id): Array<SprintDto> => {
      if (gpDto.team === parseInt(id)) {
        return [sprintDto, sprintDto, sprintDto];
      } else {
        return null;
      }
    }),
  };

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SprintController],
      providers: [SprintService],
    })
      .overrideProvider(SprintService)
      .useValue(mockSprintService)
      .compile();

    controller = module.get<SprintController>(SprintController);
  });

  it('should be defined', (): void => {
    expect(controller).toBeDefined();
  });

  it('get all sprints', (): void => {
    expect(controller.getSprints()).toHaveLength(3);
    expect(mockSprintService.getAll).toBeCalled();
  });

  it('get all sprints by driver ID', (): void => {
    expect(controller.getAllSprintsByDriver(driverId)).toHaveLength(3);
    expect(mockSprintService.getAllSprintsByDriver).toBeCalled();
  });

  it('get all sprints by circuit ID', (): void => {
    expect(controller.getAllSprintsByCircuit(circuitId)).toHaveLength(3);
    expect(mockSprintService.getAll).toBeCalled();
  });

  it('get all sprints by team ID', (): void => {
    expect(controller.getAllSprintsByTeam(teamId)).toHaveLength(3);
    expect(mockSprintService.getAll).toBeCalled();
  });
});
