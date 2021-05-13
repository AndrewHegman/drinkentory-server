import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable, UnauthorizedException, Body } from "@nestjs/common";
import { UsersService } from "../Services/users";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh-token") {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: any) {
    var user = await this.userService.findOne(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (req.body.refreshToken != (await user).refreshtoken) {
      throw new UnauthorizedException();
    }
    if (new Date() > new Date((await user).refreshtokenexpires)) {
      throw new UnauthorizedException();
    }
    return { userId: payload.sub, email: payload.email };
  }
}
