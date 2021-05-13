import { IsString, IsDateString } from "class-validator";

export class UpdateRefreshTokenDto {
  @IsString()
  email: string;

  @IsString()
  refreshToken: string;

  @IsDateString()
  refreshTokenExpires: string;
}
