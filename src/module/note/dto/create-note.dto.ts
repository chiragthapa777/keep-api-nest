import { ApiProperty } from '@nestjs/swagger';
import { Length, IsBoolean, IsString, IsArray } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty()
  @IsString()
  @Length(1, 50)
  title: string;

  @ApiProperty()
  @IsString()
  desc?: string;

  @ApiProperty()
  @IsBoolean()
  done?: boolean;

  @ApiProperty()
  @IsArray({})
  @IsString({ each: true })
  tags: string[];
}
