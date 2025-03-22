import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserConsumer } from './user.consumer';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'user-consumer-group',
          },
        },
      },
    ]),
  ],
  providers: [UserService, UserConsumer],
})
export class UserModule {}
