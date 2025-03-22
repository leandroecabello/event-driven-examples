import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'user-consumer-group', // debe ser único
        },
      },
    },
  );

  await app.listen();
  logger.log('Consumer microservice is listening for Kafka events...');
}
bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
});
