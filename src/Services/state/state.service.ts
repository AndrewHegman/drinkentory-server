import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateStateDto } from "src/Dto";
import { StateSortCol } from "src/Interfaces";
import { State as StateSchema, StateDocument } from "src/Schemas";

const defaultSortColumn: StateSortCol = "name";

@Injectable()
export class StateService {
  constructor(@InjectModel(StateSchema.name) private stateModel: Model<StateDocument>) {}

  async findAll(sortCol: string): Promise<StateDocument[]> {
    return this.stateModel.find().sort(sortCol).exec();
  }

  async findOne(id: string): Promise<StateDocument> {
    return this.stateModel.findById(id).exec();
  }

  create(createStateDto: CreateStateDto) {
    const newState = new this.stateModel(createStateDto);
    return newState.save();
  }
}
