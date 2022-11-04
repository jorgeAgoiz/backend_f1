import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { fastLapStringToMiliseconds } from 'src/common/helpers/dates.helpers';

export class QFLapsDto {
  @Expose()
  @ApiProperty()
  @IsString()
  circuit_circuit_name: string;

  @Expose()
  @ApiProperty()
  @Transform((data) => {
    if (data.value !== 'no register') {
      return fastLapStringToMiliseconds(data.value);
    }
    return data.value;
  })
  @IsNumber()
  qf_fast_lap: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  qf_qf_number: number;
}
