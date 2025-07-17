import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMedicationAssignDto } from './dto/create-medication-assign.dto';
import { UpdateMedicationAssignDto } from './dto/update-medication-assign.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicationAssign } from './entities/medication-assign.entity';
import { Repository } from 'typeorm';
import { Patient } from '../patients/entities/patient.entity';
import { processAssignmentStatus } from 'src/util/date.utils';
import { processedAssignmentsType } from 'src/types/medication-assign.types';


 

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


  

     const existingMedication = await this.medicationAssignRepository.find({
            where:{patientId:createMedicationAssignDto.patientId,medicationId:createMedicationAssignDto.patientId},
            relations: ['medication'], 
      });


      if(existingMedication.length>0){

          const processedAssignments=processAssignmentStatus(existingMedication)
          
          if (processedAssignments.some(a => a.status === 'active' || a.status === 'upcoming')) {
  
              return {
                  message: 'This medication has already been assigned to the user.',
                  data: { status: false }
              };
          }

      }



      const response=this.medicationAssignRepository.create(createMedicationAssignDto)

      await  this.medicationAssignRepository.save(response)

      return { message: 'added successfully ', data: {status:true} };


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

      const processedAssignments=processAssignmentStatus(assignments)
    

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

  // remove(id: string) {
  //   return `This action removes a #${id} medicationAssign`;
  // }

  async remove(id: string) {
  try {
    const assignment = await this.medicationAssignRepository.findOne({ where: { id } });

    if (!assignment) {
      throw new BadRequestException(`Medication assignment with ID  not found`);
    }

    await this.medicationAssignRepository.delete(id);

    return { message: 'Medication assignment deleted successfully', data: null };
  } catch (error) {
    console.error(`Failed to delete medication assignment: ${error.message}`);
    throw new BadRequestException('Failed to delete medication assignment');
  }
}



}
