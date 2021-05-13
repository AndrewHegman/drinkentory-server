import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FetchSomeHistoryDto, AddHistoryDto } from "src/Dto";
import { HistoryDocument, History as HistoryModel } from "src/Schemas";
import { historyExpandFields, HistorySortCol } from "src/Interfaces";
import { find } from "../common";

const defaultSortColumn: HistorySortCol = "date";

@Injectable()
export class HistoryService {
  constructor(@InjectModel(HistoryModel.name) private historyModel: Model<HistoryDocument>) {}

  async find(query: FetchSomeHistoryDto, current: boolean): Promise<HistoryDocument[]> {
    return find<HistoryDocument>(this.historyModel, defaultSortColumn, query, historyExpandFields, { quantity: { $gte: current ? 1 : 0 } });
  }

  async findAll(sortCol: string): Promise<HistoryDocument[]> {
    return this.historyModel.find().sort(sortCol).exec();
  }

  // async findSome(body: FetchSomeHistoryDto): Promise<HistoryDocument[]> {
  //   return this.historyModel.find().sort(sortCol).skip(parseInt(offset)).limit(parseInt(limit)).exec();
  // }

  // async findOne(id: string): Promise<HistoryDocument> {
  //   return this.historyModel.findById(id).exec();
  // }

  async create(addHistoryDto: AddHistoryDto) {
    console.log(addHistoryDto);
    const newBeer = new this.historyModel(addHistoryDto);
    return newBeer.save();
  }
}
