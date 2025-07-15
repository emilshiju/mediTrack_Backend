import { Test, TestingModule } from '@nestjs/testing';
import { MedicationAssignController } from './medication-assign.controller';
import { MedicationAssignService } from './medication-assign.service';

describe('MedicationAssignController', () => {
  let controller: MedicationAssignController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicationAssignController],
      providers: [MedicationAssignService],
    }).compile();

    controller = module.get<MedicationAssignController>(MedicationAssignController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
