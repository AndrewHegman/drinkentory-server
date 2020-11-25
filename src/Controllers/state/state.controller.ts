import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { StateService } from "src/Services";
import { CreateStateDto, FetchAllStatesDto } from "src/Dto";
import { StateDocument } from "src/Schemas";

@Controller("state")
export class StateController {
  constructor(private stateService: StateService) {}

  @Get()
  async find(@Query() query: FetchAllStatesDto): Promise<StateDocument[]> {
    return this.stateService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<StateDocument> {
    return this.stateService.findOne(id);
  }

  @Post()
  async create(@Body() createStateDto: CreateStateDto) {
    return this.stateService.create(createStateDto);
  }
}
