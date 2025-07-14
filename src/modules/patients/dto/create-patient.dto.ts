import { IsString } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  name: string;

  @IsString() 
  dateOfBirth: string; 
}
