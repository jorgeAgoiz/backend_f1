import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { fastLapStringToMiliseconds } from 'src/common/helpers/dates.helpers';

export class QFByDto {
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
  qf_fast_lap: number;

  @Expose()
  @ApiProperty()
  @Transform((data) => parseFloat(data.value))
  qf_average_speed: number;

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

  @Expose()
  @ApiProperty()
  team_name: string;

  @Expose()
  @ApiProperty()
  team_id: number;
}
