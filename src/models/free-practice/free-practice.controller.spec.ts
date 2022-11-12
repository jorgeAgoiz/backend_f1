import { Test, TestingModule } from '@nestjs/testing';
import { FastLapDto } from '../fast-lap/dtos/fl.dto';
import { GrandPrixDto } from '../grand-prix/dtos/grand-prix.dto';
import { FreePracticeDto } from './dtos/fp.dto';
import { FreePracticeController } from './free-practice.controller';
import { FreePracticeService } from './free-practice.service';

describe('FreePracticeController', () => {
  let controller: FreePracticeController;
  const gpDto: GrandPrixDto = {
    id: 148,
    circuit: 6,
    driver: 12,
    team: 4,
    year: '2022',
    sprint: false,
  };
  const fpDto: FreePracticeDto = {
    grand_prix: 148,
    fp_number: 1,
    position: 5,
    laps: 22,
    fast_lap: 106571,
    average_speed: 202.783,
  };

  const mockFreePracticeService = {
    getAll: jest.fn((): Array<FreePracticeDto> => {
      return [fpDto, fpDto, fpDto];
    }),
    getAllFpsByDriver: jest.fn((id): Array<FreePracticeDto> => {
      if (gpDto.driver === parseInt(id)) {
        return [fpDto, fpDto, fpDto, fpDto, fpDto];
      } else {
        return null;
      }
    }),
    getAllFpsByCircuit: jest.fn((id): Array<FreePracticeDto> => {
      if (gpDto.circuit === parseInt(id)) {
        return [fpDto, fpDto, fpDto, fpDto, fpDto];
      } else {
        return null;
      }
    }),
    getAllFpsByTeam: jest.fn((id): Array<FreePracticeDto> => {
      if (gpDto.team === parseInt(id)) {
        return [fpDto, fpDto, fpDto, fpDto, fpDto];
      } else {
        return null;
      }
    }),
  };

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FreePracticeController],
      providers: [FreePracticeService],
    })
      .overrideProvider(FreePracticeService)
      .useValue(mockFreePracticeService)
      .compile();

    controller = module.get<FreePracticeController>(FreePracticeController);
  });

  it('should be defined', (): void => {
    expect(controller).toBeDefined();
  });

  it('get all free practices', (): void => {
    expect(controller.getFreePractices()).toHaveLength(3);
    expect(mockFreePracticeService.getAll).toBeCalled();
  });

  it('get all free practices by driver ID', (): void => {
    const id = '12';
    expect(controller.getAllFpsByDriver(id)).toHaveLength(5);
    expect(mockFreePracticeService.getAllFpsByDriver).toHaveBeenCalledWith(
      parseInt(id),
    );
  });

  it('get all free practices by circuit ID', (): void => {
    const id = '6';
    expect(controller.getAllFpsByCircuit(id)).toHaveLength(5);
    expect(mockFreePracticeService.getAllFpsByCircuit).toHaveBeenCalledWith(
      parseInt(id),
    );
  });

  it('get all free practices by team ID', (): void => {
    const id = '4';
    expect(controller.getAllFpsByTeam(id)).toHaveLength(5);
    expect(mockFreePracticeService.getAllFpsByTeam).toHaveBeenCalledWith(
      parseInt(id),
    );
  });
});
