import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { timeStringToMiliseconds } from 'src/common/helpers/dates.helpers';

export class FPByDto {
  @Expose()
  @ApiProperty()
  @IsNumber()
  fp_grand_prix: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  fp_fp_number: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  fp_position: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  fp_laps: number;

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

  @Expose()
  @ApiProperty()
  @Transform((data) => parseFloat(data.value))
  @IsNumber()
  fp_average_speed: number;

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
