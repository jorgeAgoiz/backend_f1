import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class QualifyingAvgSpeedDto {
  @Expose()
  @ApiProperty()
  circuit_circuit_name: string;

  @Expose()
  @ApiProperty()
  @Transform((data) => parseFloat(data.value))
  qf_average_speed: string;

  @Expose()
  @ApiProperty()
  qf_qf_number: number;
}
