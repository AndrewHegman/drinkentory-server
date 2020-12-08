import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, Query } from "@nestjs/common";
import { CreateBeerDto, FetchSomeBeerDto, UpdateBeerDto } from "src/Dto";
import { BeerDocument } from "src/Schemas";
import { BeerService } from "src/Services/beer/beer.service";

@Controller("beer")
export class BeerController {
  constructor(private beerService: BeerService) {}

  @Get()
  async find(@Query() query: FetchSomeBeerDto): Promise<BeerDocument[]> {
    return this.beerService.find(query, false);
  }

  @Get("/current")
  async findCurrent(@Query() query: FetchSomeBeerDto): Promise<BeerDocument[]> {
    return this.beerService.find(query, true);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<BeerDocument> {
    return this.beerService.findOne(id);
  }

  @Post()
  async create(@Body() createBeerDto: CreateBeerDto) {
    return this.beerService.create(createBeerDto);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() updateBeerDto: UpdateBeerDto) {
    return this.beerService.update(id, updateBeerDto);
  }
}
