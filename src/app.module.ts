import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from './module/user/user.module';
import { NoteModule } from './module/note/note.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from "./module/auth/auth.guard";
import { APP_GUARD } from "@nestjs/core";
import { JwtService } from "./module/user/jwt/jwt.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env["MongoURI"]),
    JwtModule.register({
      global: true,
      secret: process.env["jwtSecret"],
      signOptions: { expiresIn: '24h' },
    }),
    UserModule,
    NoteModule,
  ],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },JwtService],
})
export class AppModule {}
