import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { timeStringToMiliseconds } from '../../../common/helpers/dates.helpers';

export class RaceByDto {
  @Expose()
  @ApiProperty()
  @IsNumber()
  race_grand_prix: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  race_position: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  race_laps_disputed: number;

  @Expose()
  @ApiProperty()
  @Transform((data) => parseFloat(data.value))
  @IsNumber()
  race_average_speed: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  race_num_pit_stops: number;

  @Expose()
  @ApiProperty()
  @Transform((data) => {
    if (data.value !== 'no register') {
      return timeStringToMiliseconds({ value: data.value, type: 'total' });
    }
    return data.value;
  })
  @IsNumber()
  race_total_time: number;

  @Expose()
  @ApiProperty()
  @IsString()
  race_retired: string;

  @Expose()
  @ApiProperty()
  @IsNumber()
  race_race_points: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  driver_id: number;

  @Expose()
  @ApiProperty()
  @IsString()
  driver_name: string;

  @Expose()
  @ApiProperty()
  @IsNumber()
  circuit_id: number;

  @Expose()
  @ApiProperty()
  @IsString()
  circuit_circuit_name: string;

  @Expose()
  @ApiProperty()
  @IsString()
  team_name: string;

  @Expose()
  @ApiProperty()
  @IsNumber()
  team_id: number;
}
