// src/medication/dto/create-medication.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMedicationDto {
  @IsString()
  @IsNotEmpty()
  
  name: string;

  @IsString()
  @IsNotEmpty()
  dosage: string;

  @IsString()
  @IsNotEmpty()
  frequency: string;
}