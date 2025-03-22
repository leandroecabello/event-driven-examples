### ¿Qué hará cada servicio?

- `producer-service`: tendrá un endpoint POST `/users` que simula la creación de un usuario. Este endpoint enviará un evento `user_created` a Kafka.
- `consumer-service`: escuchará el tópico `user_created` y simplemente imprimirá el contenido del evento recibido.

### Requisitos previos

- Tener Docker y Docker Compose para levantar Kafka rápidamente (te paso luego el `docker-compose.yml`)
- Tener instalado Nest CLI