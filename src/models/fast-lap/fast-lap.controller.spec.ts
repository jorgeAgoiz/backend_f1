import { Test, TestingModule } from '@nestjs/testing';
import { FastLapController } from './fast-lap.controller';

describe('FastLapController', () => {
  let controller: FastLapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FastLapController],
    }).compile();

    controller = module.get<FastLapController>(FastLapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
