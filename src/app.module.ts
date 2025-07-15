import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './modules/patients/patients.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { MedicationsModule } from './modules/medications/medications.module';
import { MedicationAssignModule } from './modules/medication-assign/medication-assign.module';
// import { MedicationAssignModule } from './modules/medication-assign/medication-assign.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env', 
    }),
    DatabaseModule.forRoot(),
    PatientsModule,
    MedicationsModule,
    MedicationAssignModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
