import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/Dto";
import { uid } from "rand-token";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return { email: user.email, userId: user._id };
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, userId: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: await this.generateRefreshToken(user.email),
    };
  }

  async create(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  async generateRefreshToken(email: string) {
    const refreshToken = uid(16);
    const refreshTokenExpires = new Date().setDate(new Date().getDate() + 6).toString();
    return (await this.usersService.updateRefreshToken({ email, refreshToken, refreshTokenExpires })).refreshToken;
  }
}
