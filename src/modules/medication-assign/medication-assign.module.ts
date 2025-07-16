import { Module } from '@nestjs/common';
import { MedicationAssignService } from './medication-assign.service';
import { MedicationAssignController } from './medication-assign.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationAssign } from './entities/medication-assign.entity';
import { Patient } from '../patients/entities/patient.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MedicationAssign,Patient])],
  controllers: [MedicationAssignController],
  providers: [MedicationAssignService],
})
export class MedicationAssignModule {}
