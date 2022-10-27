import { IsString, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDriverDto {
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
