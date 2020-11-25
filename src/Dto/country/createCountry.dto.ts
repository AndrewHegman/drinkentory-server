import { IsMongoId, IsString } from "class-validator";

export class CreateCountryDto {
  @IsMongoId()
  _id: string;

  @IsString()
  name: string;
}
