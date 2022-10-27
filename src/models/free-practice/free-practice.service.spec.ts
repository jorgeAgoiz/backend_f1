import { Test, TestingModule } from '@nestjs/testing';
import { FreePracticeService } from './free-practice.service';

describe('FreePracticeService', () => {
  let service: FreePracticeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FreePracticeService],
    }).compile();

    service = module.get<FreePracticeService>(FreePracticeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
