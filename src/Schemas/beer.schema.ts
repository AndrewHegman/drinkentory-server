import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Container } from "src/Interfaces";
import { Brewery as BrewerySchema } from "./brewery.schema";
import { Style as StyleSchema } from "./style.schema";
export type BeerDocument = Beer & Document;

// export const Beer = new Schema({
//   name: String,
//   brewery: {type: Types.ObjectId, ref: 'breweries'},
//   style: {type: Types.ObjectId, ref: 'styles'},
//   container: Container,
//   quantity: Number,
//   historicQuantity: Number
// }

@Schema()
export class Beer {
  @Prop()
  name: string;

  @Prop({ type: Types.ObjectId, ref: BrewerySchema.name })
  brewery: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: StyleSchema.name })
  style: Types.ObjectId;

  @Prop()
  container: Container;

  @Prop()
  quantity: number;

  @Prop()
  historicQuantity: number;
}

export const BeerSchema = SchemaFactory.createForClass(Beer);
