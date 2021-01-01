import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Beer as BeerSchema } from "./beer.schema";

export type HistoryDocument = History & Document;

@Schema({ collection: "history" })
export class History {
  @Prop()
  date: Date;

  @Prop({ type: Types.ObjectId, ref: BeerSchema.name })
  beerId: Types.ObjectId;

  @Prop()
  changeAmt: number;
}

export const HistorySchema = SchemaFactory.createForClass(History);
