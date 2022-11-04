import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GridByDto {
  @ApiProperty()
  @IsNumber()
  grid_grand_prix: number;

  @ApiProperty()
  @IsNumber()
  grid_position: number;

  @ApiProperty()
  @IsString()
  grid_type_grid: string;

  @ApiProperty()
  @IsNumber()
  driver_id: number;

  @ApiProperty()
  @IsString()
  driver_name: string;

  @ApiProperty()
  @IsNumber()
  circuit_id: number;

  @ApiProperty()
  @IsString()
  circuit_circuit_name: string;

  @ApiProperty()
  @IsNumber()
  team_id: number;

  @ApiProperty()
  @IsString()
  team_name: string;
}
