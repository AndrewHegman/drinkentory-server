import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HistoryService } from "../Services";
import { Beer, BeerSchema, History, HistorySchema, Style, StyleSchema } from "../Schemas";
import { HistoryController } from "src/Controllers";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Beer.name, schema: BeerSchema },
      { name: History.name, schema: HistorySchema },
    ]),
  ],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
