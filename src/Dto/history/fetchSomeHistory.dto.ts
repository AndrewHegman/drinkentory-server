import { IsDateString, IsMongoId, IsOptional } from "class-validator";
import { History } from "src/Schemas";
import { BaseFetchDto } from "../common";

export class FetchSomeHistoryDto extends BaseFetchDto<History> {
  /** List all actions involving a specific beer. */
  @IsOptional()
  @IsMongoId()
  beerId: string;

  /* List all actions occurring after this date. */
  @IsOptional()
  @IsDateString()
  startDate: string;

  /* List all actions occurring before this date. */
  @IsOptional()
  @IsDateString()
  endDate: string;
}
