import { IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  name: string;

  @IsString()
  country: string;

  @IsString()
  url_logo: string;
}
