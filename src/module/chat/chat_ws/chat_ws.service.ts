import { Injectable } from '@nestjs/common';
import { CreateChatWDto } from './dto/create-chat_w.dto';
import { UpdateChatWDto } from './dto/update-chat_w.dto';

@Injectable()
export class ChatWsService {
  create(createChatWDto: CreateChatWDto) {
    return 'This action adds a new chatW';
  }

  findAll() {
    return `This action returns all chatWs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatW`;
  }

  update(id: number, updateChatWDto: UpdateChatWDto) {
    return `This action updates a #${id} chatW`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatW`;
  }
}
