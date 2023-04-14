import { IsEmail, Length, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @Length(1,50)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(5,20)
  password: string;
}
export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}


