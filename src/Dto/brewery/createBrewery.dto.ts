import { IsMongoId, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateBreweryDto {
  @IsString()
  name: string;

  @IsMongoId()
  country: string;

  @IsMongoId()
  @IsOptional()
  state: string;

  @IsMongoId()
  @IsOptional()
  city: string;

  @IsNumberString()
  quantity: number;
}
