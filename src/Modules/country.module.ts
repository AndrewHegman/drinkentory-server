import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CountryService } from "../Services";
import { CountrySchema, Country } from "../Schemas";
import { CountryController } from "src/Controllers";

@Module({
  imports: [MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }])],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
