import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    // Simula creación de usuario
    const payload = { ...body, createdAt: new Date().toISOString() };

    // Emite evento a Kafka
    this.kafkaClient.emit('user_created', payload);
    return { message: 'User created and event emitted', payload };
  }
}
