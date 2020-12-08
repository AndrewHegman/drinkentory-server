import { IsArray, IsNumberString, IsOptional, IsString } from "class-validator";
import { _SortCol } from 'src/Interfaces';

export class BaseFetchDto<Document> {
  /** The maximum number of results to return. */
  @IsOptional()
  @IsNumberString()
  limit?: string;

  /** Start the data query at this index, inclusive. */
  @IsOptional()
  @IsNumberString()
  offset?: string;

  /** Column to sort the rows by. */
  @IsOptional()
  @IsString()
  sortCol?: _SortCol<Document>;

  /** Direction to sort the rows by. */
  @IsOptional()
  @IsString()
  sortDir?: "asc" | "desc";

  @IsOptional()
  @IsString()
  // @IsArray({ each: false })
  expand?: string;
}
