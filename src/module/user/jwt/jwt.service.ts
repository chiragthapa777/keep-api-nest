import { Injectable } from '@nestjs/common';
import { User } from "../entities/user.entity";
import { JwtService as JWT } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private jwtService: JWT) {}
  async getJwtToken(user: User){
    try{
      return await this.jwtService.signAsync(user);
    }catch (e ) {
      console.log("Error while generating JWT : ",e.message);
      throw e ;
    }
  }

  async verifyToken(token:string){
    return await this.jwtService.verifyAsync(token, { secret : process.env["jwtSecret"] });
  }
}
