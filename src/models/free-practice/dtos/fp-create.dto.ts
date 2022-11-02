import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class FPCreateDto {
  @IsNumber()
  @ApiProperty()
  grand_prix: number;

  @IsNumber()
  @ApiProperty()
  fp_number: number;

  @IsNumber()
  @ApiProperty()
  position: number;

  @IsNumber()
  @ApiProperty()
  laps: number;

  @IsString()
  @ApiProperty()
  fast_lap: string;

  @IsString()
  @ApiProperty()
  average_speed: string;
}
