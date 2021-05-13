import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AddPlaceDto, FetchAllPlacesDto } from "src/Dto";
import { placeExpandFields, PlaceSortCol } from "src/Interfaces";
import { Place as PlaceSchema, PlaceDocument } from "src/Schemas";
import { processSortColumnAndDirection } from "../common";

const defaultSortColumn: PlaceSortCol = "name";

@Injectable()
export class PlaceService {
  constructor(@InjectModel(PlaceSchema.name) private placeModel: Model<PlaceDocument>) {}

  async findAll(query: FetchAllPlacesDto): Promise<PlaceDocument[]> {
    const { sortCol } = query;

    const _sortCol = processSortColumnAndDirection<PlaceSortCol>(defaultSortColumn, null, defaultSortColumn);
    return this.placeModel.find().sort(_sortCol).populate(placeExpandFields).exec();
  }

  async findOne(id: string): Promise<PlaceDocument> {
    return this.placeModel.findById(id).exec();
  }

  create(addNewPlace: AddPlaceDto) {
    const newPlace = new this.placeModel(addNewPlace);
    return newPlace.save();
  }
}
