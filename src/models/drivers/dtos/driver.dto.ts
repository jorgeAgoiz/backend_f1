import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class DriverDto {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsString()
  @ApiProperty()
  name: string;

  @IsNumber()
  @ApiProperty()
  dorsal_number: number;

  @IsDateString()
  @ApiProperty()
  birthday: Date;

  @IsString()
  @ApiProperty()
  country: string;

  @IsString()
  @ApiProperty()
  picture: string;
}
