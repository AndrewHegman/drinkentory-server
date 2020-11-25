import { IsMongoId, IsOptional } from "class-validator";
import { Beer } from "src/Schemas";
import { BaseFetchDto } from "../common";

export class FetchSomeBeerDto extends BaseFetchDto<Beer> {
  /** Find all beer from specific brewery. */
  @IsOptional()
  // @IsMongoId()
  brewery: string;

  /** Find all beer from specific style. */
  @IsOptional()
  @IsMongoId()
  style: string;

  /** Find all beer from specific container. */
  @IsOptional()
  // @IsEnum(Container)
  container: number;
}
