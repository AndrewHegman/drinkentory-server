import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type StyleDocument = Style & Document;

const schemaName = "styles";

@Schema({ collection: schemaName })
export class Style {
  @Prop()
  name: string;

  @Prop({ required: false })
  baseStyle: Types.ObjectId;
}

export const StyleSchema = SchemaFactory.createForClass(Style);
