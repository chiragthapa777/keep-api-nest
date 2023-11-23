import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatWsService } from './chat_ws.service';
import { UpdateChatWDto } from './dto/update-chat_w.dto';
import { Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import { Socket } from 'socket.io';

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

  @SubscribeMessage('sendMessage')
  sendMessage(@MessageBody() message: string) {
    console.log('send message : ' + message);
    this.server.emit('newMessage', message);
    // this.server.broadcast.emit('newMessage', message);
    // this.server.
    return 'sent';
  }

  @SubscribeMessage('sendMessageRoom')
  sendMessageRoom(@MessageBody() message: string) {
    console.log('send message : ' + message);
    this.server.to('group').emit('newMessage', message);
    return 'sent';
  }

  @SubscribeMessage('join-room')
  joinRoom(
    @MessageBody() roomName: string,
    @ConnectedSocket() client: Socket,
  ): string {
    try {
      client.join(roomName);
      console.log(
        `joined room by client - ${client.id} to room - "${roomName}"`,
      );
      return 'Done';
    } catch (error) {
      return error.message || 'Not done';
    }
  }

  @SubscribeMessage('join-room')
  leaveRoom(
    @MessageBody() roomName: string,
    @ConnectedSocket() client: Socket,
  ): string {
    try {
      client.leave(roomName);
      console.log(
        `leaved room by client - ${client.id} to room - "${roomName}"`,
      );
      return 'Done';
    } catch (error) {
      return error.message || 'Not done';
    }
  }

  sendNotification(userId: string, message: string) {
    this.server
      .to(`${userId}-notification-room`)
      .emit('new-notification', message);
  }
}
