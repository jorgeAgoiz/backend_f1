import { Expose, Transform } from 'class-transformer';
import { fastLapStringToMiliseconds } from 'src/common/helpers/dates.helpers';

export class FreePracticeFastLapDto {
  @Expose()
  circuit_circuit_name: string;

  @Expose()
  @Transform((data) => {
    if (data.value !== 'no register') {
      return fastLapStringToMiliseconds(data.value);
    }
    return data.value;
  })
  fp_fast_lap: string;
}
