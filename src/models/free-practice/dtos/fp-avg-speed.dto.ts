import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class FPAvgSpeedDto {
  @Expose()
  @ApiProperty()
  circuit_circuit_name: string;

  @Expose()
  @ApiProperty()
  fp_fp_number: number;

  @Expose()
  @ApiProperty()
  @Transform((data) => parseFloat(data.value))
  fp_average_speed: number;
}
