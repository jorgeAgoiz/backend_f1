import { Expose, Transform } from 'class-transformer';
import { fastLapStringToMiliseconds } from 'src/common/helpers/dates.helpers';

export class FreePracticeByDriver {
  @Expose()
  fp_grand_prix: number;

  @Expose()
  fp_fp_number: number;

  @Expose()
  fp_position: number;

  @Expose()
  fp_laps: number;

  @Expose()
  @Transform((data) => {
    if (data.value !== 'no register') {
      return fastLapStringToMiliseconds(data.value);
    }
    return data.value;
  })
  fp_fast_lap: string;

  @Expose()
  @Transform((data) => parseFloat(data.value))
  fp_average_speed: string;

  @Expose()
  driver_id: number;

  @Expose()
  driver_name: string;

  @Expose()
  circuit_id: number;

  @Expose()
  circuit_circuit_name: string;
}
