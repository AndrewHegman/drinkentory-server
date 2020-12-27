import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PlaceService } from "../Services";
import { PlaceSchema, Place } from "../Schemas";
import { PlaceController } from "src/Controllers";

@Module({
  imports: [MongooseModule.forFeature([{ name: Place.name, schema: PlaceSchema }])],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
