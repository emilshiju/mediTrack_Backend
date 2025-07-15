// export class MedicationAssign {}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Medication } from 'src/modules/medications/entities/medication.entity';
import { Patient } from 'src/modules/patients/entities/patient.entity';

@Entity()
export class MedicationAssign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Medication)
  medication: Medication;

  @Column()
  medicationId: string;

  @ManyToOne(() => Patient)
  patient: Patient;

  @Column()
  patientId: string;

  @Column()
  numberOfDays: number;

  @Column({ type: 'date' })
  startDate: Date;
}
