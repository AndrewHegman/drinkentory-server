import { IsMongoId, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateStateDto {
  @IsString()
  name: string;

  @IsString()
  _id: string;

  @IsMongoId()
  country: string;
}
