import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateBeerDto, FetchSomeBeerDto, UpdateBeerDto } from "src/Dto";
import { Beer as BeerSchema, BeerDocument, Brewery as BrewerySchema, BreweryDocument } from "src/Schemas";
import { BeerSortCol } from "src/Interfaces";
import { processSortColumnAndDirection } from "../common";

const defaultSortColumn: BeerSortCol = "name";

@Injectable()
export class BeerService {
  constructor(
    @InjectModel(BeerSchema.name) private beerModel: Model<BeerDocument>,
    @InjectModel(BrewerySchema.name) private readonly breweryModel: Model<BreweryDocument>
  ) {}

  async find(query: FetchSomeBeerDto, current: boolean): Promise<BeerDocument[]> {
    const { sortCol, sortDir, offset, limit } = query;

    const _sortCol = processSortColumnAndDirection<BeerSortCol>(sortCol, sortDir, defaultSortColumn);
    return this.beerModel
      .find({ quantity: { $gte: current ? 1 : 0 } })
      .sort(_sortCol)
      .populate(query.expand.replace(",", " "))
      .exec();
  }

  async findAll(sortCol: string): Promise<BeerDocument[]> {
    return this.beerModel.find().sort(sortCol).exec();
  }

  // async findSome(sortCol: string, offset: string, limit: string): Promise<BeerDocument[]> {
  //   return this.beerModel.find().sort(sortCol).skip(parseInt(offset)).limit(parseInt(limit)).exec();
  // }

  async findOne(id: string): Promise<BeerDocument> {
    return this.beerModel.findById(id).exec();
  }

  async create(createBeerDto: CreateBeerDto) {
    const newBeer = new this.beerModel(createBeerDto);
    return newBeer.save();
  }

  async update(id: string, updateBeerDto: UpdateBeerDto) {
    return this.beerModel
      .findByIdAndUpdate(id, { quantity: updateBeerDto.quantity, historicQuantity: updateBeerDto.historicQuantity }, { new: true })
      .populate("brewery style")
      .exec();
  }
}
