import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BreweryController } from "../Controllers";
import { BreweryService } from "../Services";
import { Brewery, BrewerySchema } from "../Schemas";

@Module({
  imports: [MongooseModule.forFeature([{ name: Brewery.name, schema: BrewerySchema }])],
  controllers: [BreweryController],
  providers: [BreweryService],
})
export class BreweryModule {}
