import { Module } from "@nestjs/common";
import { UsersModule } from "./users.module";
import { AuthService } from "../Services/auth/auth.service";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "../Strategies/local.strategy";
import { AuthController } from "src/Controllers/auth/auth.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";
import * as dotenv from "dotenv";
import { JwtStrategy } from "src/Strategies/jwt.strategy";

dotenv.config();

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
