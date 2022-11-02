import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { fastLapStringToMiliseconds } from 'src/common/helpers/dates.helpers';

export class FPBy {
  @Expose()
  @ApiProperty()
  fp_grand_prix: number;

  @Expose()
  @ApiProperty()
  fp_fp_number: number;

  @Expose()
  @ApiProperty()
  fp_position: number;

  @Expose()
  @ApiProperty()
  fp_laps: number;

  @Expose()
  @ApiProperty()
  @Transform((data) => {
    if (data.value !== 'no register') {
      return fastLapStringToMiliseconds(data.value);
    }
    return data.value;
  })
  fp_fast_lap: number;

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

  @Expose()
  @ApiProperty()
  team_name: string;

  @Expose()
  @ApiProperty()
  team_id: number;
}
