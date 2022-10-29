import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class FreePracticeAvgSpeedDto {
  @Expose()
  @ApiProperty()
  fp_grand_prix: number;

  @Expose()
  @ApiProperty()
  fp_fp_number: number;

  @Expose()
  @ApiProperty()
  @Transform((data) => parseFloat(data.value))
  fp_average_speed: number;

  @Expose()
  @ApiProperty()
  driver_id: number;

  @Expose()
  @ApiProperty()
  driver_name: string;

  @Expose()
  @ApiProperty()
  circuit_id: number;

  @Expose()
  @ApiProperty()
  circuit_circuit_name: string;
}
