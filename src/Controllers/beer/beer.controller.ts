import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CreateBeerDto, FetchSomeBeerDto, UpdateBeerDto } from "src/Dto";
import { BeerDocument } from "src/Schemas";
import { BeerService, HistoryService } from "src/Services";
import { JwtAuthGuard } from "src/Guards/jwt-auth.guard";

@Controller("beer")
export class BeerController {
  constructor(private beerService: BeerService, private historyService: HistoryService) {}

  @UseGuards(JwtAuthGuard)
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
    return this.beerService.create(createBeerDto).then((res) => {
      return this.historyService.create({ beerId: res._id, changeAmt: res.quantity.toString(), date: new Date().toDateString() }).then(() => res);
    });
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() updateBeerDto: UpdateBeerDto) {
    const originalAmt = (await this.beerService.findOne(id)).quantity;
    return this.beerService.update(id, updateBeerDto).then((res) => {
      return this.historyService
        .create({ beerId: res._id, changeAmt: (updateBeerDto.quantity - originalAmt).toString(), date: new Date().toDateString() })
        .then(() => res);
    });
  }
}
