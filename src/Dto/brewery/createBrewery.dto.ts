import { IsMongoId, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateBreweryDto {
  @IsString()
  name: string;

  @IsMongoId()
  place: string;

  @IsNumberString()
  quantity: number;
}
