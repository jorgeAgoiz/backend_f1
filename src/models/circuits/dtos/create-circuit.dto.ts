import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCircuitDto {
  @IsString()
  @ApiProperty()
  gp_name: string;

  @IsString()
  @ApiProperty()
  circuit_name: string;

  @IsString()
  @ApiProperty()
  location: string;

  @IsString()
  @ApiProperty()
  country: string;

  @IsNumber()
  @ApiProperty()
  distance: number;
}
