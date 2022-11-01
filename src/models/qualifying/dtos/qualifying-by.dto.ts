import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { fastLapStringToMiliseconds } from 'src/common/helpers/dates.helpers';

export class QualifyingByDto {
  @Expose()
  @ApiProperty()
  qf_grand_prix: number;

  @Expose()
  @ApiProperty()
  qf_qf_number: number;

  @Expose()
  @ApiProperty()
  qf_position: number;

  @Expose()
  @ApiProperty()
  qf_laps: number;

  @Expose()
  @ApiProperty()
  @Transform((data) => {
    if (data.value !== 'no register') {
      return fastLapStringToMiliseconds(data.value);
    }
    return data.value;
  })
  qf_fast_lap: string;

  @Expose()
  @ApiProperty()
  @Transform((data) => parseFloat(data.value))
  qf_average_speed: string;
}
