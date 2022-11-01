import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { fastLapStringToMiliseconds } from 'src/common/helpers/dates.helpers';

export class QualifyingDto {
  @Expose()
  @ApiProperty()
  grand_prix: number;

  @Expose()
  @ApiProperty()
  qf_number: number;

  @Expose()
  @ApiProperty()
  position: number;

  @Expose()
  @ApiProperty()
  laps: number;

  @Expose()
  @ApiProperty()
  @Transform((data) => {
    if (data.value !== 'no register') {
      return fastLapStringToMiliseconds(data.value);
    }
    return data.value;
  })
  fast_lap: string;

  @Expose()
  @ApiProperty()
  @Transform((data) => parseFloat(data.value))
  average_speed: string;
}
