import { Test, TestingModule } from '@nestjs/testing';
import { TeamDto } from './dtos/team.dto';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';

describe('TeamsController', () => {
  let controller: TeamsController;
  const dto: TeamDto = {
    id: 4,
    name: 'New Team',
    country: 'Japón',
    url_logo:
      'https://i.pinimg.com/736x/a0/4a/ce/a04ace65e682011d0d19ce7606cd0b11.jpg',
  };

  const mockTeamService = {
    getAll: jest.fn(() => {
      return [dto, dto, dto];
    }),
    getOneBy: jest.fn((id) => {
      if (dto.id === parseInt(id)) {
        return dto;
      } else {
        return null;
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamsController],
      providers: [TeamsService],
    })
      .overrideProvider(TeamsService)
      .useValue(mockTeamService)
      .compile();

    controller = module.get<TeamsController>(TeamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('get multiple teams', (): void => {
    expect(controller.getTeams(null)).toHaveLength(3);
    expect(mockTeamService.getAll).toBeCalled();
  });

  it('get a team by ID', (): void => {
    const id = '4';
    expect(controller.getOneTeamBy(id)).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      country: expect.any(String),
      url_logo: expect.any(String),
    });
    expect(mockTeamService.getOneBy).toHaveBeenCalledWith(4);
  });
});
