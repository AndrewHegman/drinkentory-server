import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { BeerModule, BreweryModule, StyleModule, PlaceModule, HistoryModule, AuthModule } from ".";
import * as dotenv from "dotenv";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "./users.module";
import { JwtAuthGuard } from "src/Guards/jwt-auth.guard";
import { APP_GUARD } from "@nestjs/core";

dotenv.config();

const mongoDbUri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@inventory-fcghx.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

@Module({
  imports: [
    HistoryModule,
    PlaceModule,
    BreweryModule,
    StyleModule,
    BeerModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(mongoDbUri),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
