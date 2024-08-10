import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { jwtVariables } from "../variables/jwt.variables";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const accessToken = this.extractTokenFromRequest(request);

        if (!accessToken) {
            throw new UnauthorizedException("Token not found or not valid")
        }

        try {
            const payload = await this.jwtService.verifyAsync(accessToken, {
                secret: jwtVariables.JWT_SECRET,
            });
            request.user = payload;
        } catch {
            throw new UnauthorizedException("Token not verified");
        }
        return true;
    }

    extractTokenFromRequest(request: Request): string | undefined {
        return request.cookies?.accessToken;
    }
}