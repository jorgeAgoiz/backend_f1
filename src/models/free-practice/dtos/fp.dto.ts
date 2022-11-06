import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { timeStringToMiliseconds } from 'src/common/helpers/dates.helpers';

export class FreePracticeDto {
  @Expose()
  @ApiProperty()
  @IsNumber()
  grand_prix: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  fp_number: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  position: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  laps: number;

  @Expose()
  @ApiProperty()
  @Transform((data) => {
    if (data.value !== 'no register') {
      return timeStringToMiliseconds({ value: data.value, type: 'lap' });
    }
    return data.value;
  })
  @IsNumber()
  fast_lap: number;

  @Expose()
  @ApiProperty()
  @Transform((data) => parseFloat(data.value))
  @IsNumber()
  average_speed: number;
}
