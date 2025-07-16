

export interface  processedAssignmentsType {
  medicationId: string;
  patientId: string;
  numberOfDays: number;
  startDate: string | Date;
  status: 'upcoming' | 'active' | 'finished';
  remainingDays: number;
  endDate: string; 
}





// Medication entity
export interface MedicationType {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  createdAt: Date
}

// Patient (optional, currently undefined in data)
export interface PatientType {
  id: string;
  name: string;
  dateOfBirth: Date 
  createdAt: Date
}

// Medication assignment
export interface MedicationAssignmentsType {
  id?: string;
  medication?: MedicationType| undefined; 
  medicationId: string;
  patient?: PatientType | undefined; 
  patientId: string;
  numberOfDays: number;
  startDate:Date
}
