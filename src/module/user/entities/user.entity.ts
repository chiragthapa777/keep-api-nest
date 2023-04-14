import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from "mongoose";
import { Note } from "../../note/entities/note.entity";
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    required:true,
    type: String
  })
  name: string;

  @Prop({
    type: String,
    unique: true,
    required:true,
  })
  email: string;

  @Prop({
    type:String,
    required: true
  })
  password: string;

  @Prop({
    type: Date,
    default: Date.now
  })
  createdAt: string;

  @Prop({
    type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
  })
  notes:Note[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
