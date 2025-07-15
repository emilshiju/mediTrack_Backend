import { IsNotEmpty, IsString } from 'class-validator';
import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  
  @IsDate()
  @Type(() => Date) 
  @IsNotEmpty()
  dateOfBirth: Date;
}
