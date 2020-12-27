import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type PlaceDocument = Place & Document;

export type Country = {
  name: string;
  placesId: string;
};

export type State = {
  name: string;
  country: Types.ObjectId;
  placeId: string;
};

@Schema({ collection: "places" })
export class Place {
  @Prop()
  name: string;

  @Prop()
  placesId: string;

  @Prop()
  country: Country;

  @Prop()
  state: State;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
