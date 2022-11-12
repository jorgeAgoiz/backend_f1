import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class GrandPrixDto {
  @Expose()
  @ApiProperty()
  @IsNumber()
  id: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  circuit: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  driver: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  team: number;

  @Expose()
  @ApiProperty()
  @IsString()
  year: string;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  sprint: boolean;
}
