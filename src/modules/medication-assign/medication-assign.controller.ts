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
  findAll() {
    return this.medicationAssignService.findAll();
  }

  @Get()
  findAllPatientscount(){
    return this.medicationAssignService.findAllPatientscount()
  }


  @Get('patient/:id')
  findOne(@Param('id') id: string) {
    return this.medicationAssignService.findOne(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicationAssignDto: UpdateMedicationAssignDto) {
    return this.medicationAssignService.update(+id, updateMedicationAssignDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicationAssignService.remove(id);
  }

}
