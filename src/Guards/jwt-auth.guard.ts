import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { ExtractJwt } from "passport-jwt";
import { IS_PUBLIC_KEY } from "../Utils/public";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }

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

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
