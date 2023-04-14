import { Length, IsBoolean, IsString, IsArray } from 'class-validator';


export class CreateNoteDto {

  @IsString()
  @Length(1,50)
  title: string;

  @IsString()
  desc?: string;

  @IsString()
  userId: string;

  @IsBoolean()
  done?: boolean;

  @IsArray({})
  @IsString({each: true})
  tags:string[];
}
