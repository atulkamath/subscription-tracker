import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 1. Express middleware - runs first for every request
  app.use(cookieParser());
  
  // 2. CORS - handles preflight and cross-origin requests
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  });
  
  // 3. Global validation pipe - validates/transforms DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips unknown fields
      transform: true, // converts types (e.g., "12" -> 12)
    }),
  );
  
  // 4. Start server - always last
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
