import { IsNotEmpty, IsString,IsDateString ,Matches,IsNumberString,IsInt,IsPositive} from 'class-validator';
import { Transform } from 'class-transformer';


export class CreateMedicationAssignDto {

  @IsNumberString()
  @IsNotEmpty()
  medicationId: string; 

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  numberOfDays: number;

 
  @IsNumberString()
  @IsNotEmpty()
  patientId: string; 

  
  @IsDateString()  
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value)) 
   startDate:Date;
}


