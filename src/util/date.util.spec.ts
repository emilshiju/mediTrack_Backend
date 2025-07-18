import { processAssignmentStatus } from './date.utils';
import { MedicationAssignmentsType } from 'src/types/medication-assign.types';

describe('processAssignmentStatus', () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const createAssignment = (
    daysFromToday: number,
    numberOfDays: number,
  ): MedicationAssignmentsType => {
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + daysFromToday);

    return {
      medicationId: 'med-001',
      patientId: 'pat-001',
      numberOfDays,
      startDate,
    };
  };

  it('should mark assignment as "upcoming"', () => {
    const input = [createAssignment(3, 5)];
    const result = processAssignmentStatus(input);

    expect(result[0].status).toBe('upcoming');
    expect(result[0].remainingDays).toBe(0);
  });

  it('should mark assignment as "active"', () => {
    const input = [createAssignment(-1, 5)]; // Started yesterday
    const result = processAssignmentStatus(input);

    expect(result[0].status).toBe('active');
    expect(result[0].remainingDays).toBe(4); // 5 days total, 1 day passed
  });

  it('should mark assignment as "finished"', () => {
    const input = [createAssignment(-10, 5)]; // Started 10 days ago
    const result = processAssignmentStatus(input);

    expect(result[0].status).toBe('finished');
    expect(result[0].remainingDays).toBe(0);
  });
});
