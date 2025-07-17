import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { MedicationAssign } from '../medication-assign/entities/medication-assign.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Patient,MedicationAssign])],
  controllers: [PatientsController],
  providers: [PatientsService],
})
export class PatientsModule {}
