import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Angular frontend URL
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS', // Allowed HTTP methods
    allowedHeaders: '*', // Allowed headers
    credentials: true, // Allow cookies or authentication info to be sent
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3003);
}
bootstrap();
