import { IsNumber, IsOptional } from "class-validator";

export class UpdateBeerDto {
  @IsNumber()
  quantity: number;

  @IsNumber()
  @IsOptional()
  historicQuantity?: number;
}
