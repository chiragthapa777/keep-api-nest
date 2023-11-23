import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteSchema } from './entities/note.entity';
import { TagSchema } from './entities/tag.entity';
import { ChatWsModule } from '../chat/chat_ws/chat_ws.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Note', schema: NoteSchema },
      { name: 'Tag', schema: TagSchema },
    ]),
    ChatWsModule,
  ],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
