import { Test, TestingModule } from '@nestjs/testing';
import { GrandPrixService } from './grand-prix.service';

describe('GrandPrixService', () => {
  let service: GrandPrixService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrandPrixService],
    }).compile();

    service = module.get<GrandPrixService>(GrandPrixService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
