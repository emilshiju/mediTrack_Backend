// src/medication/medication.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Medication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 50 })
  dosage: string; 

  @Column({ length: 50 })
  frequency: string; 

  @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;
}