import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { MedicationAssign } from '../medication-assign/entities/medication-assign.entity';
import { Between, Raw } from 'typeorm';
@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,
    @InjectRepository(MedicationAssign)
    private medicationAssignRepository: Repository<MedicationAssign>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    try {
      const a = await this.patientsRepository.find();

      console.log('00000000000000000', a);
      console.log(createPatientDto);

      const inputDate = new Date(createPatientDto.dateOfBirth);
      const startDate = new Date(inputDate);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(inputDate);
      endDate.setHours(23, 59, 59, 999);

      const existingPatient = await this.patientsRepository.findOne({
        where: {
          name: Raw((alias) => `LOWER(${alias}) = LOWER(:name)`, {
            name: createPatientDto.name,
          }),
          dateOfBirth: Between(startDate, endDate),
        },
      });

      if (existingPatient) {
        return {
          message:
            'Patient with the same name and date of birth already exists',
          data: { status: false },
        };
      }

      const patient = this.patientsRepository.create({
        name: createPatientDto.name,
        dateOfBirth: createPatientDto.dateOfBirth,
      });

      await this.patientsRepository.save(patient);

      return { message: 'added successfully ', data: { status: true } };
    } catch (error) {
      console.log(`Failed to create patient: ${error.message}`);
      throw new BadRequestException(`Failed to create patient`);
    }
  }

  async findAll() {
    try {
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

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    try {
      const patient = await this.patientsRepository.findOne({ where: { id } });

      if (!patient) {
        throw new BadRequestException(`Patient with ID not found`);
      }

      if (updatePatientDto.dateOfBirth) {
        const existingDate = new Date(patient.dateOfBirth);
        const incomingDate = new Date(updatePatientDto.dateOfBirth);

        existingDate.setHours(0, 0, 0, 0);
        incomingDate.setHours(0, 0, 0, 0);

        if (existingDate.getTime() === incomingDate.getTime()) {
          console.log('Date of birth has not changed');
        } else {
          const inputDate = new Date(updatePatientDto.dateOfBirth);
          const startDate = new Date(inputDate);
          startDate.setHours(0, 0, 0, 0);

          const endDate = new Date(inputDate);
          endDate.setHours(23, 59, 59, 999);

          const existingPatient = await this.patientsRepository.findOne({
            where: {
              name: Raw((alias) => `LOWER(${alias}) = LOWER(:name)`, {
                name: updatePatientDto.name,
              }),
              dateOfBirth: Between(startDate, endDate),
            },
          });

          if (existingPatient) {
            return {
              message:
                'Patient with the same name and date of birth already exists',
              data: { status: false },
            };
          }

          console.log('Date of birth has changed');
        }
      }

      const updatedPatient = this.patientsRepository.merge(
        patient,
        updatePatientDto,
      );

      await this.patientsRepository.save(updatedPatient);

      return {
        message: 'Patient updated successfully',
        data: { status: true },
      };
    } catch (error) {
      console.error(`Failed to update patient: ${error.message}`);
      throw new BadRequestException('Failed to update patient');
    }
  }

  async remove(id: string) {
    try {
      const patient = await this.patientsRepository.findOne({ where: { id } });

      if (!patient) {
        throw new BadRequestException(`Patient with ID not found`);
      }

      await this.medicationAssignRepository.delete({ patientId: id });

      await this.patientsRepository.delete(id);

      return {
        message:
          'Patient and related medication assignments deleted successfully',
      };
    } catch (error) {
      console.error(`Failed to delete patient: ${error.message}`);
      throw new BadRequestException('Failed to delete patient');
    }
  }
}
