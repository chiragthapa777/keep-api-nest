import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '../user/jwt/jwt.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../constants/public';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }
    const request = context.switchToHttp().getRequest();
    // console.log(
    //   '🚀 ~ file: auth.guard.ts:24 ~ AuthGuard ~ canActivate ~ request:',
    //   request.headers,
    // );
    const bearer = request.headers.authorization || '';
    // console.log(
    //   '🚀 ~ file: auth.guard.ts:25 ~ AuthGuard ~ canActivate ~ bearer:',
    //   bearer,
    // );
    const token = bearer.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Login first');
    }
    try {
      const payload = await this.jwtService.verifyToken(token);
      request['user'] = payload;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
    return true;
  }
}
