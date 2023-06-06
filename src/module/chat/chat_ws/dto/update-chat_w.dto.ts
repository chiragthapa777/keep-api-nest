import { PartialType } from '@nestjs/mapped-types';
import { CreateChatWDto } from './create-chat_w.dto';

export class UpdateChatWDto extends PartialType(CreateChatWDto) {
  id: number;
}
