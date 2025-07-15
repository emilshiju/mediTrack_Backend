import { Module } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { MedicationsController } from './medications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medication } from './entities/medication.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Medication])],
  controllers: [MedicationsController],
  providers: [MedicationsService],
})
export class MedicationsModule {}
