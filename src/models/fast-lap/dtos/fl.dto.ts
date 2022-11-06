import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { fastLapStringToMiliseconds } from 'src/common/helpers/dates.helpers';

export class FastLapDto {
  @Expose()
  @ApiProperty()
  @IsNumber()
  grand_prix: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  fl_session: string;

  @Expose()
  @ApiProperty()
  @Transform((data) => {
    if (data.value !== 'no register') {
      return fastLapStringToMiliseconds(data.value);
    }
    return data.value;
  })
  @IsNumber()
  time: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  lap: number;
}
