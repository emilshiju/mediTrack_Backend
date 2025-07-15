import { Module } from '@nestjs/common';
import { MedicationAssignService } from './medication-assign.service';
import { MedicationAssignController } from './medication-assign.controller';

@Module({
  controllers: [MedicationAssignController],
  providers: [MedicationAssignService],
})
export class MedicationAssignModule {}
