import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CityService } from "src/Services";
import { CreateCityDto, FetchAllCitiesDto } from "src/Dto";
import { CityDocument } from "src/Schemas";

@Controller("city")
export class CityController {
  constructor(private cityService: CityService) {}

  @Get()
  async find(@Query() query: FetchAllCitiesDto): Promise<CityDocument[]> {
    return this.cityService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<CityDocument> {
    return this.cityService.findOne(id);
  }

  @Post()
  async create(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
  }
}
