import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class UserConsumer implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    // 👇 Registramos explícitamente el topic (necesario en algunos casos)
    this.kafkaClient.subscribeToResponseOf('user_created');
    await this.kafkaClient.connect();
  }

  @EventPattern('user_created')
  handleUserCreated(
    @Payload() message: { value: { id: string; name: string; email: string } },
  ) {
    console.log('Entró al handler');
    const user = message.value;
    console.log('📨 Event received [user_created]:', user);
  }
}
