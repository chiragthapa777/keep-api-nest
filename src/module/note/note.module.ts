import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { NoteSchema } from "./entities/note.entity";
import { TagSchema } from "./entities/tag.entity";

@Module({
  imports: [MongooseModule.forFeature([{name: 'Note', schema:NoteSchema},{name: 'Tag', schema:TagSchema}])],
  controllers: [NoteController],
  providers: [NoteService]
})
export class NoteModule {}
