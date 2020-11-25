import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCountryDto } from "src/Dto";
import { BrewerySortCol } from "src/Interfaces";
import { Country as CountrySchema, CountryDocument } from "src/Schemas/country.schema";

const defaultSortColumn: BrewerySortCol = "name";

@Injectable()
export class CountryService {
  constructor(@InjectModel(CountrySchema.name) private countryModel: Model<CountryDocument>) {}

  async findAll(sortCol: string): Promise<CountryDocument[]> {
    return this.countryModel.find().sort(sortCol).exec();
  }

  async findOne(id: string): Promise<CountryDocument> {
    return this.countryModel.findById(id).exec();
  }

  create(createCountryDto: CreateCountryDto) {
    const newCountry = new this.countryModel(createCountryDto);
    return newCountry.save();
  }
}
