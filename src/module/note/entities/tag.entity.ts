import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../user/entities/user.entity";
import { Note } from "./note.entity";

export type TagDocument = HydratedDocument<Tag>;

@Schema()
export class Tag {
  @Prop({
    required:true,
    type: String,
  })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;


  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }] })
  notes:Note[];
}

export const TagSchema = SchemaFactory.createForClass(Tag);
