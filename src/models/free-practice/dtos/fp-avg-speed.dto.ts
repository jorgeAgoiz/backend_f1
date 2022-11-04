import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class FPAvgSpeedDto {
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
  @Transform((data) => parseFloat(data.value))
  @IsNumber()
  fp_average_speed: number;
}
