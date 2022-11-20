import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { timeStringToMiliseconds } from '../../../common/helpers/dates.helpers';

export class RaceDto {
  @Expose()
  @ApiProperty()
  @IsNumber()
  grand_prix: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  position: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  laps_disputed: number;

  @Expose()
  @ApiProperty()
  @Transform((data) => parseFloat(data.value))
  @IsNumber()
  average_speed: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  num_pit_stops: number;

  @Expose()
  @ApiProperty()
  @Transform((data) => {
    if (data.value !== 'no register') {
      return timeStringToMiliseconds({ value: data.value, type: 'total' });
    }
    return data.value;
  })
  @IsNumber()
  total_time: number;

  @Expose()
  @ApiProperty()
  @IsString()
  retired: string;

  @Expose()
  @ApiProperty()
  @IsNumber()
  race_points: number;
}
