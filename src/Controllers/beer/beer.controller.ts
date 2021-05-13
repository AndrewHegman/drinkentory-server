import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CreateBeerDto, FetchSomeBeerDto, UpdateBeerDto } from "src/Dto";
import { BeerDocument } from "src/Schemas";
import { BeerService, HistoryService } from "src/Services";
import { JwtAuthGuard } from "src/Guards/jwt-auth.guard";
import { Error } from "mongoose";

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

  @Put("/increment/:id")
  async increment(@Param("id") id: string) {
    return this.beerService
      .increment(id)
      .then((res) => {
        return this.historyService.create({ beerId: res.newDoc._id, changeAmt: "1", date: new Date().toDateString() }).then(() => res.newDoc);
      })
      .catch((err) => {
        if (err instanceof Error.DocumentNotFoundError) {
          throw new HttpException("Document not found", HttpStatus.NOT_FOUND);
        }
        throw new HttpException(`Internal error: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  @Put("/decrement/:id")
  async decrement(@Param("id") id: string) {
    return this.beerService
      .decrement(id)
      .then((res) => {
        console.log(res);
        return this.historyService.create({ beerId: res._id, changeAmt: "-1", date: new Date().toDateString() }).then((res) => res);
      })
      .catch((err) => {
        if (err instanceof Error.DocumentNotFoundError) {
          throw new HttpException("Document not found", HttpStatus.NOT_FOUND);
        }
        throw new HttpException(`Internal error: ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() updateBeerDto: UpdateBeerDto) {
    return this.beerService
      .update(id, updateBeerDto)
      .then((res) => {
        return this.historyService
          .create({ beerId: res._id, changeAmt: (updateBeerDto.quantity - res.quantity).toString(), date: new Date().toDateString() })
          .then(() => res);
      })
      .catch((err) => {
        if (err instanceof Error.DocumentNotFoundError) {
          throw new HttpException("Document not found", HttpStatus.NOT_FOUND);
        }
        throw new HttpException("Internal error", HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
