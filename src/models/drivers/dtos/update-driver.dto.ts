import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDriverDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  dorsal_number: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  country: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  picture: string;
}
