import { Test, TestingModule } from '@nestjs/testing';
import { MedicationAssignService } from './medication-assign.service';

describe('MedicationAssignService', () => {
  let service: MedicationAssignService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicationAssignService],
    }).compile();

    service = module.get<MedicationAssignService>(MedicationAssignService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
