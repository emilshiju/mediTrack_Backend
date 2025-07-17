import { Module } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { MedicationsController } from './medications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medication } from './entities/medication.entity';
import { MedicationAssign } from '../medication-assign/entities/medication-assign.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Medication,MedicationAssign])],
  controllers: [MedicationsController],
  providers: [MedicationsService],
})
export class MedicationsModule {}
