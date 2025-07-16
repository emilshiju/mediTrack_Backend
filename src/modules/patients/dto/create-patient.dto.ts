import { IsNotEmpty, IsString,IsDateString ,Matches,IsDate} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  
  @IsDate()
  @Transform(({ value }) => new Date(value)) 
  dateOfBirth:Date;
  
}
