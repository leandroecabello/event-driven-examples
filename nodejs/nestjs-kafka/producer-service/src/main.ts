import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Bootstrap');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'producer-service', // único por servicio
      },
    },
  });

  await app.startAllMicroservices();

  const port = process.env.PORT || 4000;

  await app.listen(port, () => {
    logger.log(`Application is running on port: ${port}`);
  });
}
bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
});
