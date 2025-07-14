import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientsRepository: Repository<Patient>,
  ){}

  async create(createPatientDto: CreatePatientDto) {

    try{

      const patient=this.patientsRepository.create({name:createPatientDto.name,dateOfBirth:createPatientDto.dateOfBirth})

      await this.patientsRepository.save(patient);

  
      return { message: 'added sucesfuly ', data: null };


    }catch(error){
      console.log(`Failed to create patient: ${error.message}`)
      throw new Error(`Failed to create patient`);
    }


  }

  findAll() {
    return `This action returns all patients`;
  }

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
