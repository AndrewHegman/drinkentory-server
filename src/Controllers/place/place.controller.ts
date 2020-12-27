import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { PlaceService } from "src/Services";
import { FetchAllPlacesDto, AddPlaceDto } from "src/Dto";
import { PlaceDocument } from "src/Schemas";

@Controller("country")
export class CountryController {
  constructor(private placeService: PlaceService) {}

  @Get()
  async find(@Query() query: FetchAllPlacesDto): Promise<PlaceDocument[]> {
    return this.placeService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<PlaceDocument> {
    return this.placeService.findOne(id);
  }

  @Post()
  async create(@Body() addPlaceDto: AddPlaceDto) {
    return this.placeService.create(addPlaceDto);
  }
}
