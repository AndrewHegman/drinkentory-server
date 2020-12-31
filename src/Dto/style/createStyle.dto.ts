import { IsBoolean, IsMongoId, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateStyleDto {
  @IsString()
  name: string;

  @IsMongoId()
  @IsOptional()
  baseStyle: string;
}
