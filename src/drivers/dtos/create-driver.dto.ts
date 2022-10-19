import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  name: string;

  @IsNumber()
  dorsal_number: number;

  @IsDateString()
  birthday: Date;

  @IsString()
  country: string;

  @IsString()
  picture: string;
}
