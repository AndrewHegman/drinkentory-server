import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCityDto, FetchAllCitiesDto } from "src/Dto";
import { CitySortCol } from "src/Interfaces";
import { City as CitySchema, CityDocument } from "src/Schemas";

const defaultSortColumn: CitySortCol = "name";

@Injectable()
export class CityService {
  constructor(@InjectModel(CitySchema.name) private cityModel: Model<CityDocument>) {}

  async findAll(query: FetchAllCitiesDto): Promise<CityDocument[]> {
    const { sortCol } = query;
    return this.cityModel.find().sort(sortCol).exec();
  }

  async findOne(id: string): Promise<CityDocument> {
    return this.cityModel.findById(id).exec();
  }

  create(createNewCity: CreateCityDto) {
    const newCity = new this.cityModel(createNewCity);
    return newCity.save();
  }
}
