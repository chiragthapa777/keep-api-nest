import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatWsService } from './chat_ws.service';
import { UpdateChatWDto } from './dto/update-chat_w.dto';
import { Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatWsGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatWsService: ChatWsService) {}

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Connected : ', socket.id);
      socket.on('join-room', (room_name: string) => {
        socket.join(room_name);
      });
      socket.on('disconnect', (s: any) => {
        console.log(s);
        console.log('disconnect');
      });
    });
  }

  @SubscribeMessage('createChatW')
  create(@MessageBody() body: any) {
    console.log(body);
    this.server.to(body as string).emit('getMessage', body);
    this.server.to('room_name').emit('testing room', 'maal');
    // this.server.
    return this.chatWsService.create(body);
  }

  @SubscribeMessage('findAllChatWs')
  findAll() {
    return this.chatWsService.findAll();
  }

  @SubscribeMessage('findOneChatW')
  findOne(@MessageBody() id: number) {
    return this.chatWsService.findOne(id);
  }

  @SubscribeMessage('updateChatW')
  update(@MessageBody() updateChatWDto: UpdateChatWDto) {
    return this.chatWsService.update(updateChatWDto.id, updateChatWDto);
  }

  @SubscribeMessage('removeChatW')
  remove(@MessageBody() id: number) {
    return this.chatWsService.remove(id);
  }
}
