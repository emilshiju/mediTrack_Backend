
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  dateOfBirth:Date
  
  @Column( {type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;
}
