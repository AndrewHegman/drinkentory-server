import { IsArray, IsNumberString, IsOptional, IsString } from "class-validator";

export class BaseFetchDto<Document> {
  /** The maximum number of results to return. */
  @IsOptional()
  @IsNumberString()
  limit: string;

  /** Start the data query at this index, inclusive. */
  @IsOptional()
  @IsNumberString()
  offset: string;

  /** Column to sort the rows by. */
  @IsOptional()
  @IsString()
  sortCol: keyof Document;

  /** Direction to sort the rows by. */
  @IsOptional()
  @IsString()
  sortDir: "asc" | "desc";

  @IsOptional()
  @IsString()
  // @IsArray({ each: false })
  expand: string;
}
