import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CountryService } from "src/Services";
import { CreateCountryDto, FetchAllCountriesDto } from "src/Dto";
import { CountryDocument } from "src/Schemas";

@Controller("country")
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Get()
  async find(@Query() query: FetchAllCountriesDto): Promise<CountryDocument[]> {
    return this.countryService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<CountryDocument> {
    return this.countryService.findOne(id);
  }

  @Post()
  async create(@Body() createCountryDto: CreateCountryDto) {
    return this.countryService.create(createCountryDto);
  }
}
