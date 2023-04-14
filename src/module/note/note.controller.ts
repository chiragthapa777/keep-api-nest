import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException } from "@nestjs/common";
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { RequestUser } from "../../decorators/get_loggedin_user";
import { RequestUserInterface } from "../../types/requestUser";

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto, @RequestUser() user : RequestUserInterface) {
    try{
      return await this.noteService.create(createNoteDto, user);
    }catch (e) {
      throw new HttpException(e.message,400)
    }
  }

  @Get()
  async findAll(@RequestUser() user : RequestUserInterface) {
    return await this.noteService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto, @RequestUser() user : RequestUserInterface) {
    try{
    return this.noteService.update(id, updateNoteDto, user);
    }catch (e) {
      throw new HttpException(e.message,400)
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @RequestUser() user : RequestUserInterface) {
    try{
    return await this.noteService.remove(id, user);
    }catch (e) {
      throw new HttpException(e?.message || e,400)
    }
  }
}
