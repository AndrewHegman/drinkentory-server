import { IsMongoId, IsString } from "class-validator";

export class CreateCityDto {
  @IsMongoId()
  state: string;

  @IsString()
  name: string;
}
