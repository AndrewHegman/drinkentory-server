import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CountryService } from "src/Services";
import { CreateCountryDto } from "src/Dto";
import { CountryDocument } from "src/Schemas";

@Controller("country")
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<CountryDocument> {
    return this.countryService.findOne(id);
  }

  @Post()
  async create(@Body() createCountryDto: CreateCountryDto) {
    return this.countryService.create(createCountryDto);
  }
}
