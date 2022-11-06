import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class SprintByDto {
  @Expose()
  @IsNumber()
  @ApiProperty()
  sprint_grand_prix: number;

  @Expose()
  @IsNumber()
  @ApiProperty()
  sprint_position: number;

  @Expose()
  @IsNumber()
  @ApiProperty()
  sprint_laps_disputed: number;

  @Expose()
  @Transform((data) => parseFloat(data.value))
  @IsNumber()
  @ApiProperty()
  sprint_average_speed: number;

  @Expose()
  @IsNumber()
  @ApiProperty()
  sprint_sprint_points: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  driver_id: number;

  @Expose()
  @ApiProperty()
  @IsString()
  driver_name: string;

  @Expose()
  @ApiProperty()
  @IsNumber()
  circuit_id: number;

  @Expose()
  @ApiProperty()
  @IsString()
  circuit_circuit_name: string;

  @Expose()
  @ApiProperty()
  @IsString()
  team_name: string;

  @Expose()
  @ApiProperty()
  @IsNumber()
  team_id: number;
}
