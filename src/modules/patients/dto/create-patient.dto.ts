import { IsNotEmpty, IsString,IsDateString ,Matches} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  
  @IsDateString()  
  @IsNotEmpty()
  //  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @Transform(({ value }) => new Date(value)) 
  dateOfBirth:Date;
}
