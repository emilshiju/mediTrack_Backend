import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicationAssignService } from './medication-assign.service';
import { CreateMedicationAssignDto } from './dto/create-medication-assign.dto';
import { UpdateMedicationAssignDto } from './dto/update-medication-assign.dto';

@Controller('medication-assign')
export class MedicationAssignController {
  constructor(private readonly medicationAssignService: MedicationAssignService) {}

  @Post()
  create(@Body() createMedicationAssignDto: CreateMedicationAssignDto) {
    return this.medicationAssignService.create(createMedicationAssignDto);
  }

 

  @Get()
  findAllPatientscount(){
    return this.medicationAssignService.findAllPatients()
  }


  @Get('patient/:id')
  findOne(@Param('id') id: string) {
    return this.medicationAssignService.findOne(id);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicationAssignService.remove(id);
  }

}
