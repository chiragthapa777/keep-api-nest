import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketAdapter } from "./adapter/socket.adapter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useWebSocketAdapter(new SocketAdapter(app));
  await app.listen(9090);
}
bootstrap();
