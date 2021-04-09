import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  handleRequest(err, user, info: Error) {
    let shouldThrow = false;
    if (info instanceof TokenExpiredError) {
      // do stuff when token is expired
      console.log("token expired");
      shouldThrow = true;
    } else if (err || !user) {
      shouldThrow = true;
    }

    if (shouldThrow) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
