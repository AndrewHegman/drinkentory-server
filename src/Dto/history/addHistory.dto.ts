import { IsDateString, IsMongoId, IsNumberString } from "class-validator";

export class AddHistoryDto {
  /** Beer ID involved in action. */
  @IsMongoId()
  beerId: string;

  /* Date of the action. */
  @IsDateString()
  date: string;

  /* Amount changed. */
  @IsNumberString()
  changeAmt: string;
}
