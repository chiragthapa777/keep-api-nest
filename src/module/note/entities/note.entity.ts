import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../user/entities/user.entity';
import { Tag } from './tag.entity';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
  @Prop({
    required: true,
    type: String,
  })
  title: string;

  @Prop({
    type: String,
  })
  desc: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({
    type: Boolean,
    default: false,
  })
  done: boolean;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }])
  tags: Tag[];
}

export const NoteSchema = SchemaFactory.createForClass(Note);
