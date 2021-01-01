import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { HistoryService } from "src/Services";
import { FetchAllHistoryDto, AddHistoryDto, FetchSomeHistoryDto } from "src/Dto";
import { HistoryDocument } from "src/Schemas";

@Controller("history")
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get()
  async find(@Query() query: FetchAllHistoryDto): Promise<HistoryDocument[]> {
    return this.historyService.findAll(query.sortCol);
  }

  // @Get()
  // async findSome(@Body() body: FetchSomeHistoryDto): Promise<HistoryDocument[]> {
  //   return this.historyService.findSome(body);
  // }

  // @Post()
  // async create(@Body() addHistoryDto: AddHistoryDto) {
  //   // TODO: Handle internal errors (like duplicate key error) https://stackoverflow.com/questions/50864001/how-to-handle-mongoose-error-with-nestjs
  //   return this.historyService.create(addPlaceDto);
  // }
}
