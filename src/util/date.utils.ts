import { MedicationAssignmentsType, processedAssignmentsType } from "src/types/medication-assign.types";



export const processAssignmentStatus=(assignments:MedicationAssignmentsType[]):processedAssignmentsType[]=>{


    const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day

  const processedAssignments:processedAssignmentsType [] = assignments.map(assignment => {

    const startDate = new Date(assignment.startDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + assignment.numberOfDays);
    
    let status: 'upcoming' | 'active' | 'finished';
    let remainingDays = 0;

    if (today < startDate) {
      // Treatment hasn't started yet
      status = 'upcoming';
      remainingDays = 0
    } else if (today <= endDate) {
      // Treatment is in progress
      status = 'active';
      remainingDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    } else {
      // Treatment has finished
      status = 'finished';
      remainingDays = 0;
    }

    return {
      ...assignment,
      status,
      remainingDays,
      endDate: endDate.toISOString().split('T')[0] // Add endDate for reference
    };
  });

   return processedAssignments;



}

    