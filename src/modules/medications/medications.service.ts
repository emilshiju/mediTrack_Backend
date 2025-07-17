import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Medication } from './entities/medication.entity';
import { Repository } from 'typeorm';
import { MedicationAssign } from '../medication-assign/entities/medication-assign.entity';

@Injectable()
export class MedicationsService {
  constructor(
    @InjectRepository(Medication)
    private medicationRepository: Repository<Medication>,
    @InjectRepository(MedicationAssign)
    private medicationAssignRepository:Repository<MedicationAssign>
  ){}

  async create(createMedicationDto: CreateMedicationDto) {

    try{

            const medication = this.medicationRepository.create(createMedicationDto);
            await this.medicationRepository.save(medication);
            
            return {message: 'Medication added successfully',data: null };


    }catch(error){

          console.log(`Failed to create Medication: ${error.message}`)
          throw new  BadRequestException(`Failed to create patient`);
    }

    
  }
  

  async findAll(){

    try{
      const medications=await this.medicationRepository.find()
      return { message: 'Medications retrieved successfully', data:medications };

    }catch(error){

      console.error(`Failed to fetch Medications: ${error.message}`);
      throw new BadRequestException('failed to retrieve medications');

    }

  }

  // findAll() {
  //   return `This action returns all medications`;
  // }


  async findOne(id: string) {
    
  try {
    
    const medication = await this.medicationRepository.findOne({ where: { id } });

    if (!medication) {
      throw new BadRequestException(`Medication with ID  not found`);
    }

    return { message: 'Medication fetched successfully', data:medication };

  } catch (error) {
    console.error(`Failed to fetch medication: ${error.message}`);
    throw new BadRequestException('Failed to fetch medication');
  }
  

  }

  

  // update(id: string, updateMedicationDto: UpdateMedicationDto) {
  //   return `This action updates a #${id} medication`;
  // }

  async update(id: string, updateMedicationDto: UpdateMedicationDto) {
  try {
    const medication = await this.medicationRepository.findOne({ where: { id } });

    if (!medication) {
      throw new BadRequestException(`Medication with ID  not found`);
    }

    const updatedMedication = this.medicationRepository.merge(medication, updateMedicationDto);

    await this.medicationRepository.save(updatedMedication);

    return { message: 'Medication updated successfully', data: updatedMedication };
  } catch (error) {
    console.error(`Failed to update medication: ${error.message}`);
    throw new BadRequestException('Failed to update medication');
  }

}




  async remove(id: string) {
  try {

    console.log("on deleteeeeeeeeeeeee")
   
    const medication = await this.medicationRepository.findOne({ where: { id } });

    if (!medication) {
      throw new BadRequestException(`Medication with ID  not found`);
    }

    const isAssigned = await this.medicationAssignRepository.findOne({ where: { medicationId: id } });

    if (isAssigned) {
      return {
        message: `Cannot delete medication. It is currently assigned to one or more patients.`,
        data:{status:false},

      };
    }

  
    await this.medicationRepository.delete(id);

    return {
      message: 'Medication deleted successfully',
      data:{status:true},
    };
  } catch (error) {
    console.error(`Failed to delete medication: ${error.message}`);
    throw new BadRequestException('Failed to delete medication');
  }
}


}
