import { Test, TestingModule } from '@nestjs/testing';
import { PolePosition, RacePosition } from './dtos/gp-best-results.dto';
import { GrandPrixController } from './grand-prix.controller';
import { GrandPrixService } from './grand-prix.service';

describe('GrandPrixController', (): void => {
  let controller: GrandPrixController;

  const victories: Array<RacePosition> = [
    {
      driver_name: 'Max Verstappen',
      circuit_gp_name: 'GP de Arabia Saudí',
      race_position: 1,
    },
  ];
  const podiums: Array<RacePosition> = [
    {
      driver_name: 'Max Verstappen',
      circuit_gp_name: 'GP de Austria',
      race_position: 2,
    },
  ];
  const polePositions: Array<PolePosition> = [
    {
      driver_name: 'Max Verstappen',
      circuit_gp_name: 'GP Emilia Romagna',
      grid_position: 1,
      grid_type_grid: 'race',
    },
  ];

  const mockGrandPrixService = {
    getBestResultsByDriverId: jest.fn((id): any => {
      if (parseInt(id) === 1) {
        return { victories, podiums, polePositions };
      } else {
        return null;
      }
    }),
  };

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrandPrixController],
      providers: [GrandPrixService],
    })
      .overrideProvider(GrandPrixService)
      .useValue(mockGrandPrixService)
      .compile();

    controller = module.get<GrandPrixController>(GrandPrixController);
  });

  it('should be defined', (): void => {
    expect(controller).toBeDefined();
  });

  it('get best results (Victories, podiums and pole positions) by driver ID', (): void => {
    const id = '1';
    expect(controller.getBestResultsByDriver(id)).toMatchObject({
      victories,
      podiums,
      polePositions,
    });
    expect(mockGrandPrixService.getBestResultsByDriverId).toHaveBeenCalledWith(
      parseInt(id),
    );
  });
});
