import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicationAssignDto } from './create-medication-assign.dto';

export class UpdateMedicationAssignDto extends PartialType(CreateMedicationAssignDto) {}
