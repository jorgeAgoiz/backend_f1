import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class QFPositionsDto {
  @Expose()
  @ApiProperty()
  circuit_circuit_name: string;

  @Expose()
  @ApiProperty()
  qf_qf_number: number;

  @Expose()
  @ApiProperty()
  qf_position: number;
}
