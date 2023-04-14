import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./entities/user.entity";
import { JwtService } from './jwt/jwt.service';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: 'User',
      schema: UserSchema
    }
  ])],
  controllers: [UserController],
  providers: [UserService, JwtService]
})
export class UserModule {}
