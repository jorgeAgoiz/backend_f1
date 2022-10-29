import { Expose, Transform } from 'class-transformer';

export class FreePracticeAvgSpeedDto {
  @Expose()
  fp_grand_prix: number;

  @Expose()
  fp_fp_number: number;

  @Expose()
  @Transform((data) => parseFloat(data.value))
  fp_average_speed: number;

  @Expose()
  driver_id: number;

  @Expose()
  driver_name: string;

  @Expose()
  circuit_id: number;

  @Expose()
  circuit_circuit_name: string;
}
