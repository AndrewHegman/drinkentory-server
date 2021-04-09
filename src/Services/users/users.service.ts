import { Injectable } from "@nestjs/common";
import { UserDocument } from "src/Schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User as UserModel } from "src/Schemas";
import { CreateUserDto } from "src/Dto/user/createUser.dto";

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserModel.name) private userModel: Model<UserDocument>) {}

  async findOne(email: string): Promise<User | undefined> {
    console.log(email);
    console.log(await this.userModel.findOne({ email }));
    return await this.userModel.findOne({ email });
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }
}
