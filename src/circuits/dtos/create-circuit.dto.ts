import { IsString, IsNumber } from 'class-validator';

export class CreateCircuitDto {
  @IsString()
  gp_name: string;

  @IsString()
  circuit_name: string;

  @IsString()
  location: string;

  @IsString()
  country: string;

  @IsNumber()
  distance: number;
}
