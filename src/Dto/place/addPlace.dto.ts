import { IsMongoId, IsNumberString, IsObject, IsOptional, IsString } from "class-validator";
import { State, Country } from "src/Schemas";

export class AddPlaceDto {
  @IsString()
  placesId: string;

  @IsString()
  name: string;

  @IsObject()
  country: Country;

  @IsObject()
  @IsOptional()
  state: State;
}
