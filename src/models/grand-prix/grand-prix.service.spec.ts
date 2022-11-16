import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GrandPrix } from './grand-prix.entity';
import { GrandPrixService } from './grand-prix.service';

describe('GrandPrixService', () => {
  let service: GrandPrixService;

  const mockGrandPrixRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GrandPrixService,
        {
          provide: getRepositoryToken(GrandPrix),
          useValue: mockGrandPrixRepository,
        },
      ],
    }).compile();

    service = module.get<GrandPrixService>(GrandPrixService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
