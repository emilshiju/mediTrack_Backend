import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  
  const configService = app.get(ConfigService);
  
 
  const port = configService.get<number>('PORT') || 4000;
  
  await app.listen(port);
  
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
