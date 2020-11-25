import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { BeerModule, BreweryModule, StyleModule, CountryModule, StateModule, CityModule } from ".";
import * as dotenv from "dotenv";

dotenv.config();

const mongoDbUri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@inventory-fcghx.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

@Module({
  imports: [
    CityModule,
    StateModule,
    CountryModule,
    BreweryModule,
    StyleModule,
    BeerModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(mongoDbUri),
  ],
})
export class AppModule {}
