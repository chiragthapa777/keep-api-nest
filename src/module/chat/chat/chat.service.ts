import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatWsGateway } from "../chat_ws/chat_ws.gateway";
import { Server } from 'socket.io';

@Injectable()
export class ChatService {
  socket: Server;
  constructor(private socketws: ChatWsGateway) {
    this.socket = socketws.server;
  }
  create(createChatDto: CreateChatDto) {
    this.socket.emit("notify", {name:"chirag"})
    return 'This action adds a new chat';
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
