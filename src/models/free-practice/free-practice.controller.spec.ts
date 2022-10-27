import { Test, TestingModule } from '@nestjs/testing';
import { FreePracticeController } from './free-practice.controller';

describe('FreePracticeController', () => {
  let controller: FreePracticeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FreePracticeController],
    }).compile();

    controller = module.get<FreePracticeController>(FreePracticeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
