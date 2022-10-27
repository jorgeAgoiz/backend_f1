import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  country: string;

  @IsString()
  @ApiProperty()
  url_logo: string;
}
