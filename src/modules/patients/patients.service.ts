import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private  patientsRepository: Repository<Patient>,
  ){}

  async create(createPatientDto: CreatePatientDto) {

    try{

      const patient= this.patientsRepository.create({name:createPatientDto.name,dateOfBirth:createPatientDto.dateOfBirth})
      
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


  // findAll() {
  //   return `This action returns all patients`;
  // }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
