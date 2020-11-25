import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StateService } from "../Services";
import { State, StateSchema } from "../Schemas";
import { StateController } from "src/Controllers";

@Module({
  imports: [MongooseModule.forFeature([{ name: State.name, schema: StateSchema }])],
  controllers: [StateController],
  providers: [StateService],
})
export class StateModule {}
