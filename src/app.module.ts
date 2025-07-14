import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './modules/patients/patients.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AppController,ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
