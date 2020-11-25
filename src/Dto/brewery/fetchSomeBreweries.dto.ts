import { IsMongoId, IsOptional } from "class-validator";
import { Brewery } from "src/Schemas";
import { BaseFetchDto } from "../common";

export class FetchSomeBreweriesDto extends BaseFetchDto<Brewery> {
  /** List all breweries from a specific country. */
  @IsOptional()
  // @IsEnum()
  country: string;

  /** List all breweries from a specific state. */
  @IsOptional()
  @IsMongoId()
  state: string;

  /** List all breweries from a specific city. */
  @IsOptional()
  @IsMongoId()
  city: string;
}
