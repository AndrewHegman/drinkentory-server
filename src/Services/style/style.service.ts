import { Injectable } from "@nestjs/common";
import { Style as StyleSchema } from "src/Schemas";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { StyleDocument } from "src/Schemas";
import { CreateStyleDto, FetchSomeStylesDto } from "src/Dto";
import { processSortColumnAndDirection } from "../common";
import { StyleSortCol } from "src/Interfaces";

const defaultSortColumn: StyleSortCol = "name";

@Injectable()
export class StyleService {
  constructor(@InjectModel(StyleSchema.name) private styleModel: Model<StyleDocument>) {}

  async findAll(query: FetchSomeStylesDto): Promise<StyleDocument[]> {
    const { sortCol, sortDir } = query;
    const _sortCol = processSortColumnAndDirection<StyleSortCol>(sortCol, sortDir, defaultSortColumn);
    return this.styleModel.find().sort(_sortCol).exec();
  }

  // async findSome(sortCol: string, offset: string, limit: string): Promise<StyleDocument[]> {
  //   return this.styleModel.find().sort(sortCol).skip(parseInt(offset)).limit(parseInt(limit)).exec();
  // }

  async findOne(id: string): Promise<StyleDocument> {
    return this.styleModel.findById(id).exec();
  }

  async create(createStyleDto: CreateStyleDto) {
    // Check if style already exists (check by name)
    const existingStyle = await this.styleModel.find({ name: createStyleDto.name }).exec();
    if (existingStyle.length > 0) {
      return Promise.reject(`Style "${createStyleDto.name}" already exists with ID "${existingStyle[0]._id}`);
    }
    const newStyle = new this.styleModel(createStyleDto);
    return newStyle.save();
  }
}
