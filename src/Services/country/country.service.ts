import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AddPlaceDto, FetchAllPlacesDto } from "src/Dto";
import { countryExpandFields, CountrySortCol } from "src/Interfaces";
import { Country as CountrySchema, CountryDocument } from "src/Schemas/country.schema";
import { processSortColumnAndDirection } from "../common";

const defaultSortColumn: CountrySortCol = "name";

@Injectable()
export class CountryService {
  constructor(@InjectModel(CountrySchema.name) private countryModel: Model<CountryDocument>) {}

  async findAll(query: FetchAllPlacesDto): Promise<CountryDocument[]> {
    const { sortCol } = query;

    const _sortCol = processSortColumnAndDirection<CountrySortCol>(defaultSortColumn, null, defaultSortColumn);

    return this.countryModel.find().sort(_sortCol).populate(countryExpandFields).exec();
  }

  async findOne(id: string): Promise<CountryDocument> {
    return this.countryModel.findById(id).exec();
  }

  async create(createCountryDto: CreateCountryDto) {
    const newCountry = new this.countryModel(createCountryDto);
    return newCountry.save();
  }
}
