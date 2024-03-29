import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './module/user/user.module';
import { NoteModule } from './module/note/note.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './module/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from './module/user/jwt/jwt.service';
import { ChatModule } from './module/chat/chat/chat.module';
import { ChatWsModule } from './module/chat/chat_ws/chat_ws.module';
import { CloudinaryModule } from './module/cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env['MongoURI']),
    JwtModule.register({
      global: true,
      secret: process.env['jwtSecret'],
      signOptions: { expiresIn: '24h' },
    }),
    UserModule,
    NoteModule,
    ChatModule,
    ChatWsModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    JwtService,
  ],
})
export class AppModule {}
