import { Body, Controller, Get, Param, Post, Put, Query, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateUserDto } from "src/Dto";
import { LocalAuthGuard } from "src/Guards/local-auth.guard";
import { AuthService } from "src/Services/auth/auth.service";
import { JwtRefreshGuard } from "src/Guards/jwt-refresh.guard";
import { Public } from "src/Utils/public";
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post("/create")
  async create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @UseGuards(JwtRefreshGuard)
  @Post("/refresh")
  async refresh(@Request() req) {
    return await this.authService.login(req.user);
  }
}
