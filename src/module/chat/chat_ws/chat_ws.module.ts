import { Module } from '@nestjs/common';
import { ChatWsService } from './chat_ws.service';
import { ChatWsGateway } from './chat_ws.gateway';

@Module({
  providers: [ChatWsGateway, ChatWsService]
})
export class ChatWsModule {}
