import { IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCircuitDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  gp_name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  circuit_name: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  distance: number;
}
