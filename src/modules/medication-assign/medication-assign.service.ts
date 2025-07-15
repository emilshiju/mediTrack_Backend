import { Injectable } from '@nestjs/common';
import { CreateMedicationAssignDto } from './dto/create-medication-assign.dto';
import { UpdateMedicationAssignDto } from './dto/update-medication-assign.dto';

@Injectable()
export class MedicationAssignService {
  create(createMedicationAssignDto: CreateMedicationAssignDto) {
    return 'This action adds a new medicationAssign';
  }

  findAll() {
    return `This action returns all medicationAssign`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicationAssign`;
  }

  update(id: number, updateMedicationAssignDto: UpdateMedicationAssignDto) {
    return `This action updates a #${id} medicationAssign`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicationAssign`;
  }
}
