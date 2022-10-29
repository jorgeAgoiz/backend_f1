import { Expose, Transform } from 'class-transformer';
import { fastLapStringToMiliseconds } from 'src/common/helpers/dates.helpers';

export class FreePracticeDto {
  @Expose()
  grand_prix: number;

  @Expose()
  fp_number: number;

  @Expose()
  position: number;

  @Expose()
  laps: number;

  @Expose()
  @Transform((data) => {
    if (data.value !== 'no register') {
      return fastLapStringToMiliseconds(data.value);
    }
    return data.value;
  })
  fast_lap: string;

  @Expose()
  @Transform((data) => parseFloat(data.value))
  average_speed: string;
}
