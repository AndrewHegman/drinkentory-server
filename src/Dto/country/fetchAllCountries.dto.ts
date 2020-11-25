import { IsMongoId, IsOptional } from "class-validator";
import { Country } from "src/Schemas";
import { BaseFetchDto } from "../common";

export class FetchAllCountriesDto extends BaseFetchDto<Country> {}
