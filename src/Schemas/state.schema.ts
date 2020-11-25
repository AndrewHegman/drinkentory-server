import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Country as CountrySchema } from "./country.schema";
export type StateDocument = State & Document;

@Schema()
export class State {
  @Prop()
  name: string;

  @Prop({ type: Types.ObjectId, ref: CountrySchema.name })
  style: string;
}

export const StateSchema = SchemaFactory.createForClass(State);
