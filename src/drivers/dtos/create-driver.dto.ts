import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  name: string;

  @IsNumber()
  dorsal_name: number;

  @IsDate()
  birthday: Date;

  @IsString()
  country: string;

  @IsString()
  picture: string;
}
