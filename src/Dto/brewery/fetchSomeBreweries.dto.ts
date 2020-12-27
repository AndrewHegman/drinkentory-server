import { IsMongoId, IsOptional } from "class-validator";
import { Brewery } from "src/Schemas";
import { BaseFetchDto } from "../common";

export class FetchSomeBreweriesDto extends BaseFetchDto<Brewery> {
  /** List all breweries from a specific 'place'. */
  @IsOptional()
  @IsMongoId()
  place: string;
}
