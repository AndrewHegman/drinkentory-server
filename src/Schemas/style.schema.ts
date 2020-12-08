import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type StyleDocument = Style & Document;

@Schema({ collection: "styles" })
export class Style {
  @Prop()
  name: string;

  @Prop()
  quantity: number;

  @Prop()
  baseStyle: Types.ObjectId;
}

export const StyleSchema = SchemaFactory.createForClass(Style);
