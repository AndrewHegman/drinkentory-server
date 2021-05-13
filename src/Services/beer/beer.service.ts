import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateBeerDto, FetchSomeBeerDto, UpdateBeerDto, BaseFetchDto } from "src/Dto";
import { Beer as BeerModel, BeerDocument, Brewery as BreweryModel, BreweryDocument } from "src/Schemas";
import { beerExpandFields } from "src/Interfaces";
import { BeerSortCol } from "src/Interfaces";
import { find } from "../common";

const defaultSortColumn: BeerSortCol = "name";

@Injectable()
export class BeerService {
  constructor(
    @InjectModel(BeerModel.name) private beerModel: Model<BeerDocument>,
    @InjectModel(BreweryModel.name) private readonly breweryModel: Model<BreweryDocument>
  ) {}

  async find(query: FetchSomeBeerDto, current: boolean): Promise<BeerDocument[]> {
    return find<BeerDocument>(this.beerModel, defaultSortColumn, query, beerExpandFields, { quantity: { $gte: current ? 1 : 0 } });
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
    let updatedDocument: UpdateBeerDto = {
      quantity: updateBeerDto.quantity,
    };

    if (updateBeerDto.historicQuantity) {
      updatedDocument.historicQuantity = updateBeerDto.historicQuantity;
    }

    return this.beerModel.findByIdAndUpdate(id, updatedDocument).populate(beerExpandFields).orFail().exec();
  }

  async increment(id: string) {
    return this.beerModel
      .findById(id)
      .orFail()
      .then((oldDoc) => {
        return this.beerModel
          .findByIdAndUpdate(id, { $inc: { quantity: 1, historicQuantity: 1 } }, { new: true })
          .populate(beerExpandFields)
          .orFail()
          .exec()
          .then((newDoc) => ({ newDoc, oldDoc }));
      });
  }

  async decrement(id: string) {
    return this.beerModel
      .findByIdAndUpdate(id, { $inc: { quantity: -1 } })
      .populate(beerExpandFields)
      .orFail()
      .exec();
  }
}
