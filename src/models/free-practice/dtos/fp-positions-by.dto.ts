import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class FPPositionsDto {
  @ApiProperty()
  @IsString()
  circuit_circuit_name: string;

  @ApiProperty()
  @IsNumber()
  fp_fp_number: number;

  @ApiProperty()
  @IsNumber()
  fp_position: number;
}
