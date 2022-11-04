import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GridByDto {
  @Expose()
  @ApiProperty()
  @IsNumber()
  grid_grand_prix: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  grid_position: number;

  @Expose()
  @ApiProperty()
  @IsString()
  grid_type_grid: string;

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
  @IsNumber()
  team_id: number;

  @Expose()
  @ApiProperty()
  @IsString()
  team_name: string;
}
