import { Inject, Injectable, Scope, UnauthorizedException } from "@nestjs/common";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Note } from "./entities/note.entity";
import { Tag } from "./entities/tag.entity";
import { RequestUserInterface } from "../../types/requestUser";
@Injectable({ scope: Scope.REQUEST })
export class NoteService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>,
              @InjectModel(Tag.name) private tagModel: Model<Tag>,
              @InjectConnection() private readonly connection: mongoose.Connection) {
  }

  async create(createNoteDto: CreateNoteDto, user: RequestUserInterface) {
    const t = await this.connection.startSession();
    t.startTransaction();
    try {
      const {tags} = createNoteDto
      const tagsArr: Tag[] = []
      if(tags){
        for(const name of tags){
          const foundTag = await this.tagModel.findOne({
            userId:user._id,
            name
          }).session(t)
          if(foundTag){
            tagsArr.push(foundTag)
          }else{
            const newTag = new this.tagModel({
              name,
              userId:user._id
            })
            await newTag.save({
              session:t
            })
            tagsArr.push(newTag)
          }
        }
      }

      delete createNoteDto.tags
      const newNote = new this.noteModel({
        ...createNoteDto,
        tags:tagsArr,
        userId: user._id
      })
      await newNote.save({
        session:t
      })
      await t.commitTransaction();
      return newNote
    } catch (e) {
      await t.abortTransaction();
      throw e;
    } finally {
      t.endSession();
    }
    const { tags } = createNoteDto;

  }

  async findAll(user: RequestUserInterface) {
    return await this.noteModel.find({
      userId: user._id
    }).populate({
      path: "tags" ,
      match:{ },
      select:['name']
    }).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto, user: RequestUserInterface) {
    const t = await this.connection.startSession();
    t.startTransaction();
    try {
      const note = await this.noteModel.findById(id).exec()
      if(!note) throw "Cannot find the note"
      if(note.userId.toString() !== user._id) throw new UnauthorizedException("You cannot edit this note")
      const {tags} = updateNoteDto
      const tagsArr: Tag[] = []
      if(tags){
        for(const name of tags){
          const foundTag = await this.tagModel.findOne({
            userId:user._id,
            name
          }).session(t)
          if(foundTag){
            tagsArr.push(foundTag)
          }else{
            const newTag = new this.tagModel({
              name,
              userId:user._id
            })
            await newTag.save({
              session:t
            })
            tagsArr.push(newTag)
          }
        }
      }
      const editObj = {
        ...updateNoteDto,
        tags:tagsArr
      }
      if(tagsArr.length > 0){
        editObj.tags = tagsArr
      }
      await note.updateOne(editObj,{
        session:t,
      })
      await t.commitTransaction();
      return { ...note.toObject(), ...editObj }
    } catch (e) {
      await t.abortTransaction();
      throw e;
    } finally {
      t.endSession();
    }
  }

  async remove(id: string, user:RequestUserInterface) {
    try{
      return await this.noteModel.findByIdAndDelete(id).exec();
    }catch (e) {
      throw "Cannot find note"
    }

  }
}
