import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Swagger config
  const config = new DocumentBuilder()
    .setTitle('User Example')
    .setDescription('The user API description')
    .setVersion('1.0')
    .addTag('User')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  //Pipes for validations
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
