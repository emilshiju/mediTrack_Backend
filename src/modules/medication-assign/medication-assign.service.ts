import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMedicationAssignDto } from './dto/create-medication-assign.dto';
import { UpdateMedicationAssignDto } from './dto/update-medication-assign.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicationAssign } from './entities/medication-assign.entity';
import { Repository } from 'typeorm';
import { Patient } from '../patients/entities/patient.entity';

@Injectable()
export class MedicationAssignService {
  constructor(
    @InjectRepository(MedicationAssign)
    private readonly medicationAssignRepository: Repository<MedicationAssign>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ){}

  async create(createMedicationAssignDto: CreateMedicationAssignDto) {

    try{

      const response=this.medicationAssignRepository.create(createMedicationAssignDto)

      await  this.medicationAssignRepository.save(response)

      return { message: 'added successfully ', data: null };


    }catch(error){
      console.log(`Failed to assign medicine: ${error.message}`)
      throw new  BadRequestException(`Failed to assign medicine`);
    }
  
  }



  // findAll() {
  //   return `This action returns all medicationAssign`;
  // }

  async  findAllPatientscount (){

    try{



      const patients = await this.patientRepository .find()

    
      return { message: 'Patients with count  retrieved successfully', data: patients };


    }catch(error){
        console.log(`Failed to fetch: ${error.message}`)
      throw new  BadRequestException(`Failed to fetch `);
    }

  }


  async findAll (){


    try{

      return `This action returns all medicationAssign`;


    }catch(error){
        console.log(`Failed to fetch: ${error.message}`)
      throw new  BadRequestException(`Failed to fetch `);
    }

  }





  async findOne(id: string) {

     try{
      console.log("got id",id)

       const assignments = await this.medicationAssignRepository.find({
            where:{patientId:id},
            relations: ['medication'], 
      });

      
      


    const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day

  const processedAssignments = assignments.map(assignment => {
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



      console.log(' i got all assignmentsssssssssssssss')
      console.log(processedAssignments)

  return { message: 'Patients with count  retrieved successfully', data:processedAssignments };



    }catch(error){
        console.log(`Failed to fetch: ${error.message}`)
      throw new  BadRequestException(`Failed to fetch `);
    }


  }



  update(id: number, updateMedicationAssignDto: UpdateMedicationAssignDto) {
    return `This action updates a #${id} medicationAssign`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicationAssign`;
  }
}
