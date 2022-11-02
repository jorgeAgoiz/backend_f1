import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FPPositionsDto {
  @Expose()
  @ApiProperty()
  circuit_circuit_name: string;

  @Expose()
  @ApiProperty()
  fp_fp_number: number;

  @Expose()
  @ApiProperty()
  fp_position: number;
}
