import { Test, TestingModule } from '@nestjs/testing';
import { FastLapService } from './fast-lap.service';

describe('FastLapService', () => {
  let service: FastLapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FastLapService],
    }).compile();

    service = module.get<FastLapService>(FastLapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
