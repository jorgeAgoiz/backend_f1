import { Test, TestingModule } from '@nestjs/testing';
import { GrandPrixDto } from '../grand-prix/dtos/grand-prix.dto';
import { GridDto } from './dtos/grid.dto';
import { GridController } from './grid.controller';
import { GridService } from './grid.service';

describe('GridController', (): void => {
  let controller: GridController;
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

  const mockGridService = {
    getAll: jest.fn((): Array<GridDto> => {
      return [gridDto, gridDto, gridDto];
    }),
    getAllGridsByType: jest.fn((type): Array<GridDto> => {
      if (gridDto.type_grid === type) {
        return [gridDto, gridDto];
      } else {
        return null;
      }
    }),
    getAllGridsByDriver: jest.fn((id): Array<GridDto> => {
      if (gpDto.driver === parseInt(id)) {
        return [gridDto, gridDto, gridDto, gridDto, gridDto];
      } else {
        return null;
      }
    }),
    getAllGridsByCircuit: jest.fn((id): Array<GridDto> => {
      if (gpDto.circuit === parseInt(id)) {
        return [gridDto, gridDto, gridDto, gridDto, gridDto];
      } else {
        return null;
      }
    }),
    getAllGridsByTeam: jest.fn((id): Array<GridDto> => {
      if (gpDto.team === parseInt(id)) {
        return [gridDto, gridDto, gridDto, gridDto, gridDto];
      } else {
        return null;
      }
    }),
  };

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GridController],
      providers: [GridService],
    })
      .overrideProvider(GridService)
      .useValue(mockGridService)
      .compile();

    controller = module.get<GridController>(GridController);
  });

  it('should be defined', (): void => {
    expect(controller).toBeDefined();
  });

  it('get al grids', (): void => {
    expect(controller.getGrids()).toHaveLength(3);
    expect(mockGridService.getAll).toBeCalled();
  });

  it('get all grids by type', (): void => {
    expect(controller.getGridsByType('race')).toHaveLength(2);
    expect(mockGridService.getAllGridsByType).toBeCalledWith('race');
  });

  it('get all free practices by driver ID', (): void => {
    const id = '12';
    expect(controller.getGridsByDriver(id)).toHaveLength(5);
    expect(mockGridService.getAllGridsByDriver).toHaveBeenCalledWith(
      parseInt(id),
    );
  });

  it('get all free practices by circuit ID', (): void => {
    const id = '6';
    expect(controller.getGridsByCircuit(id)).toHaveLength(5);
    expect(mockGridService.getAllGridsByCircuit).toHaveBeenCalledWith(
      parseInt(id),
    );
  });

  it('get all free practices by team ID', (): void => {
    const id = '4';
    expect(controller.getGridsByTeam(id)).toHaveLength(5);
    expect(mockGridService.getAllGridsByTeam).toHaveBeenCalledWith(
      parseInt(id),
    );
  });
});
