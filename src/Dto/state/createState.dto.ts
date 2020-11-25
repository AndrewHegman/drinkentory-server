import { IsMongoId, IsString } from "class-validator";

export class CreateStateDto {
  @IsMongoId()
  _id: string;

  @IsMongoId()
  country: string;

  @IsString()
  name: string;
}
