import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GridDto {
  @ApiProperty()
  @IsNumber()
  grand_prix: number;

  @ApiProperty()
  @IsNumber()
  position: number;

  @ApiProperty()
  @IsString()
  type_grid: string;
}
