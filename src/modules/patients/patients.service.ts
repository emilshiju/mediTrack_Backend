import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { MedicationAssign } from '../medication-assign/entities/medication-assign.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private  patientsRepository: Repository<Patient>,
    @InjectRepository(MedicationAssign)
    private medicationAssignRepository:Repository<MedicationAssign>
  ){}

  async create(createPatientDto: CreatePatientDto) {

    try{

      const patient = this.patientsRepository.create({name:createPatientDto.name,dateOfBirth:createPatientDto.dateOfBirth})
      
      await this.patientsRepository.save(patient);

      console.log("show patineeeet")
      console.log(patient)

  
      return { message: 'added sucesfuly ', data: null };


    }catch(error){
      console.log(`Failed to create patient: ${error.message}`)
      throw new  BadRequestException(`Failed to create patient`);
    }


  }

  async findAll() {
  try {
    console.log("insideeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    const patients = await this.patientsRepository.find();
    return { message: 'Patients retrieved successfully', data: patients };
  } catch (error) {
    console.error(`Failed to fetch patients: ${error.message}`);
    throw new BadRequestException('Failed to retrieve patients');
  }
}


 
async findOne(id: string) {
  try {
    const patient = await this.patientsRepository.findOne({ where: { id } });

    if (!patient) {
      throw new BadRequestException(`Patient with ID  not found`);
    }

    return { message: 'Patient retrieved successfully', data: patient };

  } catch (error) {
    console.error(`Failed to retrieve patient: ${error.message}`);
    throw new BadRequestException('Failed to retrieve patient');
  }
}


  // update(id: number, updatePatientDto: UpdatePatientDto) {
  //   return `This action updates a #${id} patient`;
  // }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
  try {
    const patient = await this.patientsRepository.findOne({ where: { id } });

    if (!patient) {
      throw new BadRequestException(`Patient with ID not found`);
    }

    const updatedPatient = this.patientsRepository.merge(patient, updatePatientDto);

    await this.patientsRepository.save(updatedPatient);

    return { message: 'Patient updated successfully', data: updatedPatient };
  } catch (error) {
    console.error(`Failed to update patient: ${error.message}`);
    throw new BadRequestException('Failed to update patient');
  }
}



  // remove(id: string) {
  //   return `This action removes a #${id} patient`;
  // }

  async remove(id: string) {
  try {


    // const patient = await this.patientsRepository.findOne({ where: { id } });
    
    await this.medicationAssignRepository.delete({ patientId: id });

    await this.patientsRepository.delete(id);

    return { message: 'Patient and related medication assignments deleted successfully' };

  } catch (error) {
    console.error(`Failed to delete patient: ${error.message}`);
    throw new BadRequestException('Failed to delete patient');
  }
}



}
