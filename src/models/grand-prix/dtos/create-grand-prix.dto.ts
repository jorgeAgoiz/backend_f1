import { IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGrandPrixDto {
  @IsNumber()
  @ApiProperty()
  circuit: number;

  @IsNumber()
  @ApiProperty()
  driver: number;

  @IsNumber()
  @ApiProperty()
  team: number;

  @IsString()
  @ApiProperty()
  year: string;

  @IsBoolean()
  @ApiProperty()
  sprint: boolean;
}
