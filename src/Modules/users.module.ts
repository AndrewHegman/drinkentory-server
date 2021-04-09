import { Module } from "@nestjs/common";
import { User, UserSchema } from "src/Schemas";
import { UsersService } from "../Services/users/users.service";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
