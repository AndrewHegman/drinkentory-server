import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type BreweryDocument = Brewery & Document;

@Schema({ collection: "breweries" })
export class Brewery {
  @Prop()
  name: string;

  @Prop()
  country: string;

  @Prop({ required: false })
  state: string;

  @Prop({ required: false })
  city: string;

  @Prop()
  quantity: number;
}

export const BrewerySchema = SchemaFactory.createForClass(Brewery);

export const expandFields = ["country", "state", "city"];
