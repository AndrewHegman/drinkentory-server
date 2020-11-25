import { IsMongoId, IsString } from "class-validator";

export class CreateCityDto {
  @IsMongoId()
  _id: string;

  @IsMongoId()
  state: string;

  @IsString()
  name: string;
}
