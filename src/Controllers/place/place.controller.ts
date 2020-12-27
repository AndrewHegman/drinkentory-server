import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { PlaceService } from "src/Services";
import { FetchAllPlacesDto, AddPlaceDto } from "src/Dto";
import { PlaceDocument } from "src/Schemas";

@Controller("place")
export class PlaceController {
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
    // TODO: Handle internal errors (like duplicate key error) https://stackoverflow.com/questions/50864001/how-to-handle-mongoose-error-with-nestjs
    return this.placeService.create(addPlaceDto);
  }
}
