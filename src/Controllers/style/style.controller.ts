import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { StyleService } from "src/Services";
import { CreateStyleDto, FetchSomeStylesDto } from "src/Dto";
import { StyleDocument } from "src/Schemas";

@Controller("style")
export class StyleController {
  constructor(private styleService: StyleService) {}

  @Get()
  async find(@Query() query: FetchSomeStylesDto): Promise<StyleDocument[]> {
    return this.styleService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<StyleDocument> {
    return this.styleService.findOne(id);
  }

  @Post()
  async create(@Body() createStyleDto: CreateStyleDto) {
    return this.styleService.create(createStyleDto);
  }
}
