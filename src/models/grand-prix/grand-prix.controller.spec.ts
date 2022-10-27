import { Test, TestingModule } from '@nestjs/testing';
import { GrandPrixController } from './grand-prix.controller';

describe('GrandPrixController', () => {
  let controller: GrandPrixController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrandPrixController],
    }).compile();

    controller = module.get<GrandPrixController>(GrandPrixController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
