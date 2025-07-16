import { IsNotEmpty, IsString,IsDateString ,Matches,IsNumberString,IsInt,IsPositive,IsDate, IsUUID} from 'class-validator';
import { Transform } from 'class-transformer';


export class CreateMedicationAssignDto {

  @IsUUID()
  @IsNotEmpty()
  medicationId: string; 


  @IsUUID()
  @IsNotEmpty()
  patientId: string; 


  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  numberOfDays: number;

  
  @IsDate()
  @Transform(({ value }) => new Date(value)) 
  startDate:Date;
}


