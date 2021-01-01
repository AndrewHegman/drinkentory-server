import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { BeerModule, BreweryModule, StyleModule, PlaceModule, HistoryModule } from ".";
import * as dotenv from "dotenv";

dotenv.config();

const mongoDbUri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@inventory-fcghx.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

@Module({
  imports: [HistoryModule, PlaceModule, BreweryModule, StyleModule, BeerModule, ConfigModule.forRoot(), MongooseModule.forRoot(mongoDbUri)],
})
export class AppModule {}
