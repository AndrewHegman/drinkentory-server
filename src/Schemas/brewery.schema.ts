import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Place as PlaceSchema } from "./place.schema";

export type BreweryDocument = Brewery & Document;

@Schema({ collection: "breweries" })
export class Brewery {
  @Prop()
  name: string;

  @Prop({ type: Types.ObjectId, ref: PlaceSchema.name })
  place: Types.ObjectId;

  @Prop()
  quantity: number;
}

export const BrewerySchema = SchemaFactory.createForClass(Brewery);
