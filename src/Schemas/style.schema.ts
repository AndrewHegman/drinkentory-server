import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type StyleDocument = Style & Document;

@Schema({ collection: "styles" })
export class Style {
  @Prop()
  name: string;

  @Prop()
  quantity: number;

  @Prop()
  baseStyle: string;
}

export const StyleSchema = SchemaFactory.createForClass(Style);
