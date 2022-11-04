import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { fastLapStringToMiliseconds } from 'src/common/helpers/dates.helpers';

export class QFLapsDto {
  @Expose()
  @ApiProperty()
  circuit_circuit_name: string;

  @Expose()
  @ApiProperty()
  @Transform((data) => {
    if (data.value !== 'no register') {
      return fastLapStringToMiliseconds(data.value);
    }
    return data.value;
  })
  qf_fast_lap: number;

  @Expose()
  @ApiProperty()
  qf_qf_number: number;
}
