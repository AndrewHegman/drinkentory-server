import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateStateDto, FetchAllStatesDto } from "src/Dto";
import { stateExpandFields, StateSortCol } from "src/Interfaces";
import { State as StateSchema, StateDocument } from "src/Schemas";
import { processSortColumnAndDirection } from "../common";

const defaultSortColumn: StateSortCol = "name";

@Injectable()
export class StateService {
  constructor(@InjectModel(StateSchema.name) private stateModel: Model<StateDocument>) {}

  async findAll(query: FetchAllStatesDto): Promise<StateDocument[]> {
    const { sortCol } = query;

    const _sortCol = processSortColumnAndDirection<StateSortCol>(sortCol, null, defaultSortColumn);

    return this.stateModel.find().sort(_sortCol).populate(stateExpandFields).exec();
  }

  async findOne(id: string): Promise<StateDocument> {
    return this.stateModel.findById(id).exec();
  }

  async create(createStateDto: CreateStateDto) {
    const newCountry = new this.stateModel(createStateDto);
    return newCountry.save();
  }
}
