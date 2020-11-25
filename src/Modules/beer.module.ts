import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BeerController } from "../Controllers";
import { BeerService } from "../Services";
import { Beer, BeerSchema, Brewery, BrewerySchema, Style, StyleSchema } from "../Schemas";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Brewery.name, schema: BrewerySchema },
      { name: Style.name, schema: StyleSchema },
      { name: Beer.name, schema: BeerSchema },
    ]),
  ],
  controllers: [BeerController],
  providers: [BeerService],
})
export class BeerModule {}
