import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class SprintDto {
  @Expose()
  @IsNumber()
  @ApiProperty()
  grand_prix: number;

  @Expose()
  @IsNumber()
  @ApiProperty()
  position: number;

  @Expose()
  @IsNumber()
  @ApiProperty()
  laps_disputed: number;

  @Expose()
  @Transform((data) => parseFloat(data.value))
  @IsNumber()
  @ApiProperty()
  average_speed: number;

  @Expose()
  @IsNumber()
  @ApiProperty()
  sprint_points: number;
}
