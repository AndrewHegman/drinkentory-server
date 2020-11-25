import { IsEnum, IsMongoId, IsNumber, IsString } from "class-validator";
import { Container } from "../../Interfaces";

export class CreateBeerDto {
  @IsMongoId()
  _id: string;

  @IsString()
  name: string;

  @IsMongoId()
  brewery: string;

  @IsMongoId()
  style: string;

  @IsEnum(Container)
  // Issues with this since it needs to be sent as a string but enums are converted to numbers so we end up with a type collision
  container: Container;

  @IsNumber()
  quantity: number;
}
