import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { fastLapStringToMiliseconds } from 'src/common/helpers/dates.helpers';

export class FLByDto {
  @Expose()
  @ApiProperty()
  @IsNumber()
  fl_grand_prix: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  fl_fl_session: string;

  @Expose()
  @ApiProperty()
  @Transform((data) => {
    if (data.value !== 'no register') {
      return fastLapStringToMiliseconds(data.value);
    }
    return data.value;
  })
  @IsNumber()
  fl_time: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  fl_lap: number;

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
