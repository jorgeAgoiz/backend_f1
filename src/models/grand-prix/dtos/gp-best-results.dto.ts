import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray } from 'class-validator';

export class RacePosition {
  driver_name: string;
  circuit_gp_name: string;
  race_position: number;
}

export interface PolePosition {
  driver_name: string;
  circuit_gp_name: string;
  grid_position: number;
  grid_type_grid: string;
}

export class GPBestResultsDto {
  @Expose()
  @ApiProperty()
  @IsArray()
  victories: Array<RacePosition>;

  @Expose()
  @ApiProperty()
  @IsArray()
  podiums: Array<RacePosition>;

  @Expose()
  @ApiProperty()
  @IsArray()
  polePositions: Array<PolePosition>;
}
