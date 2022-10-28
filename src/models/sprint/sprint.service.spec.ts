import { Test, TestingModule } from '@nestjs/testing';
import { SprintService } from './sprint.service';

describe('SprintService', () => {
  let service: SprintService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SprintService],
    }).compile();

    service = module.get<SprintService>(SprintService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
