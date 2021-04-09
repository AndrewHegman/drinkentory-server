import { Body, Controller, Get, Param, Post, Put, Query, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateUserDto } from "src/Dto";
import { LocalAuthGuard } from "src/Guards/local-auth.guard";
import { AuthService } from "src/Services/auth/auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Request() req) {
    console.log(req);
    return this.authService.login(req.user);
  }

  @Post("/create")
  async create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
}
