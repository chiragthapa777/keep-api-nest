import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  Query,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { RequestUser } from '../../decorators/get_loggedin_user';
import { RequestUserInterface } from '../../types/requestUser';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Note')
@ApiBearerAuth()
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  async create(
    @Body() createNoteDto: CreateNoteDto,
    @RequestUser() user: RequestUserInterface,
  ) {
    try {
      return await this.noteService.create(createNoteDto, user);
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }

  @Get()
  @ApiQuery({
    name: 'search',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'done',
    type: Boolean,
    required: false,
  })
  async findAll(
    @RequestUser() user: RequestUserInterface,
    @Query('search') search: string,
    @Query('done') done: boolean | string,
  ) {
    console.log(
      '🚀 ~ file: note.controller.ts:54 ~ NoteController ~ done:',
      done,
      typeof done,
    );
    const findObj = { userId: user._id };
    if (search) {
      findObj['$or'] = [
        {
          title: { $regex: '.*' + search + '.*', $options: 'i' },
        },
        {
          desc: { $regex: '.*' + search + '.*', $options: 'i' },
        },
      ];
    }
    if (done !== undefined || done !== '') {
      findObj['done'] = done;
    }
    return await this.noteService.findAll(findObj);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noteService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @RequestUser() user: RequestUserInterface,
  ) {
    try {
      return this.noteService.update(id, updateNoteDto, user);
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @RequestUser() user: RequestUserInterface,
  ) {
    try {
      return await this.noteService.remove(id, user);
    } catch (e) {
      throw new HttpException(e?.message || e, 400);
    }
  }
}
