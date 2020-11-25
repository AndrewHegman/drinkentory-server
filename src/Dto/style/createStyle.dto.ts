import { IsBoolean, IsMongoId, IsNumberString, IsString } from "class-validator";

export class CreateStyleDto {
  @IsMongoId()
  _id: string;

  @IsString()
  name: string;

  @IsMongoId()
  baseStyle: string;

  @IsNumberString()
  quantity: number;
}
