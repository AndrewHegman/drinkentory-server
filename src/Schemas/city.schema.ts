import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Country as CountrySchema } from "./country.schema";
export type CityDocument = City & Document;

@Schema()
export class City {
  @Prop()
  name: string;

  @Prop({ type: Types.ObjectId, ref: CountrySchema.name })
  state: string;
}

export const CitySchema = SchemaFactory.createForClass(City);
