import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HistoryService } from "../Services";
import { Beer, BeerSchema, History, HistorySchema, Style, StyleSchema } from "../Schemas";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Beer.name, schema: BeerSchema },
      { name: History.name, schema: HistorySchema },
    ]),
  ],
  providers: [HistoryService],
})
export class HistoryModule {}
