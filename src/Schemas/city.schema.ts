import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { State as StateSchema } from "./state.schema";
export type CityDocument = City & Document;

@Schema()
export class City {
  @Prop()
  name: string;

  @Prop({ type: Types.ObjectId, ref: StateSchema.name })
  state: Types.ObjectId;
}

export const CitySchema = SchemaFactory.createForClass(City);
