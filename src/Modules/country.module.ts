import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CountryService } from "../Services";
import { Style, StyleSchema } from "../Schemas";
import { CountryController } from "src/Controllers";

@Module({
  imports: [MongooseModule.forFeature([{ name: Style.name, schema: StyleSchema }])],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
