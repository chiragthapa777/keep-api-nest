import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatWsModule } from "../chat_ws/chat_ws.module";

@Module({
  controllers: [ChatController],
  providers: [ChatService],
  imports: [ChatWsModule],
})
export class ChatModule {}
