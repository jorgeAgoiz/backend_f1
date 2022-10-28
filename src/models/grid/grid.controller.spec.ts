import { Test, TestingModule } from '@nestjs/testing';
import { GridController } from './grid.controller';

describe('GridController', () => {
  let controller: GridController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GridController],
    }).compile();

    controller = module.get<GridController>(GridController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
