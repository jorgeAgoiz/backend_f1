import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class QFAvgSpeedDto {
  @Expose()
  @ApiProperty()
  @IsString()
  circuit_circuit_name: string;

  @Expose()
  @ApiProperty()
  @Transform((data) => parseFloat(data.value))
  @IsNumber()
  qf_average_speed: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  qf_qf_number: number;
}
