import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class QFAvgSpeedDto {
  @Expose()
  @ApiProperty()
  circuit_circuit_name: string;

  @Expose()
  @ApiProperty()
  @Transform((data) => parseFloat(data.value))
  qf_average_speed: number;

  @Expose()
  @ApiProperty()
  qf_qf_number: number;
}
