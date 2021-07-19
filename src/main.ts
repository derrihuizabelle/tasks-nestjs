import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const port = process.env.PORT;

  const app = await NestFactory.create(AppModule);

  if (process.env.STAGE === 'dev') {
    app.enableCors();
  }

  await app.listen(port);

  logger.log(`Aplication running on port ${port}`);
}
bootstrap();
