import { Test, TestingModule } from '@nestjs/testing';
import { QualifyingController } from './qualifying.controller';

describe('QualifyingController', () => {
  let controller: QualifyingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QualifyingController],
    }).compile();

    controller = module.get<QualifyingController>(QualifyingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
