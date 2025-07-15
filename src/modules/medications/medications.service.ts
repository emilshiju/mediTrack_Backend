import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Medication } from './entities/medication.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MedicationsService {
  constructor(
    @InjectRepository(Medication)
    private medicationRepository: Repository<Medication>,
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
  

  findAll() {
    return `This action returns all medications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medication`;
  }

  update(id: number, updateMedicationDto: UpdateMedicationDto) {
    return `This action updates a #${id} medication`;
  }

  remove(id: number) {
    return `This action removes a #${id} medication`;
  }
}
