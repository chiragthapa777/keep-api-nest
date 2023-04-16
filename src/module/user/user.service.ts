import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto, LoginUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./entities/user.entity";
import { JwtService } from "./jwt/jwt.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwt: JwtService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const foundUser = await this.userModel.findOne({
      email:createUserDto.email
    }).exec();
    if(foundUser) throw new BadRequestException("Email already used.")
    const newUser = new this.userModel(createUserDto);
    await newUser.save()
    const savedUser = await newUser.toObject();
    delete savedUser.password;
    savedUser["token"] = await this.jwt.getJwtToken(savedUser)
    return savedUser;
  }

  async login(loginUserDto: LoginUserDto): Promise<User>{
    const foundUser = await this.userModel.findOne({
      email:loginUserDto.email
    }).exec();
    if(!foundUser) throw new BadRequestException("Invalid Credentials.")
    const isMatch = await bcrypt.compare(loginUserDto.password, foundUser.password);
    if(!isMatch) throw new BadRequestException("Invalid Credentials.")
    const user = foundUser.toObject();
    delete user.password
    user["token"] = await this.jwt.getJwtToken(user);
    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
