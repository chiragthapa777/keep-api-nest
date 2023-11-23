import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length, IsString } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'ram',
  })
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'ram@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Test@123',
  })
  @IsString()
  @Length(5, 20)
  password: string;
}
export class LoginUserDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'ram@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Test@123',
  })
  @IsString()
  @IsString()
  password: string;
}
