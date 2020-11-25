import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CityService } from "../Services";
import { CitySchema, City } from "../Schemas";
import { CityController } from "src/Controllers";

@Module({
  imports: [MongooseModule.forFeature([{ name: City.name, schema: CitySchema }])],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
