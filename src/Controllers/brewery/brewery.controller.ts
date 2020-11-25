import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { BreweryService } from "src/Services";
import { FetchSomeBreweriesDto, CreateBreweryDto } from "src/Dto";
import { BreweryDocument } from "src/Schemas";

@Controller("brewery")
export class BreweryController {
  constructor(private breweryService: BreweryService) {}

  @Get()
  async find(@Query() query: FetchSomeBreweriesDto): Promise<BreweryDocument[]> {
    return this.breweryService.find(query, false);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<BreweryDocument> {
    return this.breweryService.findOne(id);
  }

  @Post()
  async create(@Body() createBeerDto: CreateBreweryDto) {
    return this.breweryService.create(createBeerDto);
  }
}
