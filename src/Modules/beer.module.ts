import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BeerController } from "../Controllers";
import { BeerService, HistoryService } from "../Services";
import { Beer, BeerSchema, Brewery, BrewerySchema, History, HistorySchema, Style, StyleSchema } from "../Schemas";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: History.name, schema: HistorySchema },
      { name: Brewery.name, schema: BrewerySchema },
      { name: Style.name, schema: StyleSchema },
      { name: Beer.name, schema: BeerSchema },
    ]),
  ],
  controllers: [BeerController],
  providers: [BeerService, HistoryService],
})
export class BeerModule {}
