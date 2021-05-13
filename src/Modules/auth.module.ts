import { Module } from "@nestjs/common";
import { UsersModule } from "./users.module";
import { AuthService } from "../Services/auth/auth.service";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "../Strategies/local.strategy";
import { AuthController } from "src/Controllers/auth/auth.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";
import * as dotenv from "dotenv";
import { JwtStrategy } from "src/Strategies/jwt.strategy";
import { JwtRefreshStrategy } from "src/Strategies/jwtRefresh.strategy";

dotenv.config();

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "600s" },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
