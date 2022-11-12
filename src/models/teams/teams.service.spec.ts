import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TeamDto } from './dtos/team.dto';
import { Team } from './team.entity';
import { TeamsService } from './teams.service';

describe('TeamsService', (): void => {
  let service: TeamsService;
  const dto: TeamDto = {
    id: 4,
    name: 'New Team',
    country: 'Japón',
    url_logo:
      'https://i.pinimg.com/736x/a0/4a/ce/a04ace65e682011d0d19ce7606cd0b11.jpg',
  };

  const mockTeamsService = {
    find: jest.fn().mockImplementation(() => Promise.resolve([dto, dto, dto])),
    findOneBy: jest.fn().mockImplementation(({ id }) => {
      if (dto.id === id) {
        return Promise.resolve(dto);
      } else {
        return Promise.reject();
      }
    }),
  };

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamsService,
        {
          provide: getRepositoryToken(Team),
          useValue: mockTeamsService,
        },
      ],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
  });

  it('should be defined', (): void => {
    expect(service).toBeDefined();
  });

  it('get all teams', async (): Promise<void> => {
    expect(await service.getAll(null)).toHaveLength(3);
  });

  it('get a team by ID', async (): Promise<void> => {
    const id = '4';
    expect(await service.getOneBy(parseInt(id))).toEqual(dto);
  });
});
