import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { timeStringToMiliseconds } from 'src/common/helpers/dates.helpers';

export class FPLapTimesDto {
  @Expose()
  @ApiProperty()
  @IsString()
  circuit_circuit_name: string;

  @Expose()
  @ApiProperty()
  @IsNumber()
  fp_fp_number: number;

  @Expose()
  @ApiProperty()
  @Transform((data) => {
    if (data.value !== 'no register') {
      return timeStringToMiliseconds({ value: data.value, type: 'lap' });
    }
    return data.value;
  })
  @IsNumber()
  fp_fast_lap: number;
}
