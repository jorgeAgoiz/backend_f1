import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class QFPositionsDto {
  @ApiProperty()
  @IsString()
  circuit_circuit_name: string;

  @ApiProperty()
  @IsNumber()
  qf_qf_number: number;

  @ApiProperty()
  @IsNumber()
  qf_position: number;
}
