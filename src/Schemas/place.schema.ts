import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Country, CountrySchema } from "./country.schema";
import { State, StateSchema } from "./state.schema";

export type PlaceDocument = Place & Document;

@Schema({ collection: "places" })
export class Place {
  @Prop()
  name: string;

  @Prop()
  placesId: string;

  @Prop({ type: CountrySchema, required: true })
  country: Country;

  @Prop({ type: StateSchema, required: false })
  state: State;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
