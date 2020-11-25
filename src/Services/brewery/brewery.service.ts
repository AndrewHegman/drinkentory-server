import { Injectable } from "@nestjs/common";
import { Brewery as BrewerySchema } from "src/Schemas";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BreweryDocument } from "src/Schemas";
import { CreateBreweryDto, FetchSomeBreweriesDto } from "src/Dto";
import { processSortColumnAndDirection } from "../common";
import { BrewerySortCol } from "src/Interfaces";

const defaultSortColumn: BrewerySortCol = "name";

@Injectable()
export class BreweryService {
  constructor(@InjectModel(BrewerySchema.name) private breweryModel: Model<BreweryDocument>) {}

  async find(query: FetchSomeBreweriesDto, current: boolean): Promise<BreweryDocument[]> {
    const { sortCol, sortDir, offset, limit } = query;

    const _sortCol = processSortColumnAndDirection<BrewerySortCol>(sortCol, sortDir, defaultSortColumn);

    return this.findAll(_sortCol);

    // return this.findSome(_sortCol, limit, offset);
  }

  async findAll(sortCol: string): Promise<BreweryDocument[]> {
    return this.breweryModel.find().sort(sortCol).exec();
  }

  // async findSome(sortCol: string, offset: string, limit: string): Promise<BreweryDocument[]> {
  //   return this.breweryModel.find().sort(sortCol).skip(parseInt(offset)).limit(parseInt(limit)).exec();
  // }

  async findOne(id: string): Promise<BreweryDocument> {
    return this.breweryModel.findById(id).exec();
  }

  create(createBreweryDto: CreateBreweryDto) {
    const newBrewery = new this.breweryModel(createBreweryDto);
    return newBrewery.save();
  }
}
