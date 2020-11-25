import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StyleController } from "../Controllers";
import { StyleService } from "../Services";
import { Style, StyleSchema } from "../Schemas";

@Module({
  imports: [MongooseModule.forFeature([{ name: Style.name, schema: StyleSchema }])],
  controllers: [StyleController],
  providers: [StyleService],
})
export class StyleModule {}
