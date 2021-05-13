import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ collection: "users" })
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  refreshToken: string;

  @Prop()
  refreshTokenExpires: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
