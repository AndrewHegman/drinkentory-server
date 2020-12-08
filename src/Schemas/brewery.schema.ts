import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { City as CitySchema } from "./city.schema";
import { Country as CountrySchema } from "./country.schema";
import { State as StateSchema } from "./state.schema";

export type BreweryDocument = Brewery & Document;

@Schema({ collection: "breweries" })
export class Brewery {
  @Prop()
  name: string;

  @Prop({ type: Types.ObjectId, ref: CountrySchema.name })
  country: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: StateSchema.name })
  state: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: CitySchema.name })
  city: Types.ObjectId;

  @Prop()
  quantity: number;
}

export const BrewerySchema = SchemaFactory.createForClass(Brewery);

export const expandFields = ["country", "state", "city"];
