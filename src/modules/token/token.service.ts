import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { TokensIF } from "src/interfaces/tokens.interfaces";

interface PayloadIF {
    id:number;
    role:string;
}

@Injectable()
export class TokenService {
    constructor(
        private readonly JwtService: JwtService,
        private readonly ConfigService: ConfigService,
    ) {}

    private async generateJwtAccessToken(payload:PayloadIF) {
        const options = {
            secret: this.ConfigService.get("secret_jwt"),
            expiresIn: this.ConfigService.get("expire_access_jwt"),
        }
        return this.JwtService.sign(payload, options);
    }

    private async generateJwtRefreshToken(payload:PayloadIF) {
        const options = {
            secret: this.ConfigService.get("secret_jwt"),
            expiresIn: this.ConfigService.get("expire_refresh_jwt"),
        }
        return this.JwtService.sign(payload, options);
    }

    async generateJwtTokens(payload:PayloadIF): Promise<TokensIF> {
        const accessToken = await this.generateJwtAccessToken(payload);
        const refreshToken = await this.generateJwtRefreshToken(payload);
        return {accessToken, refreshToken}
    }

    async regenerateJwtToken(refreshToken:string) {
        const options = {
            secret: this.ConfigService.get("secret_jwt"),
        }
        return await this.JwtService.verifyAsync(refreshToken, options);
    }

    validateToken(accessToken: string) {
        return this.JwtService.verify(accessToken, {
            secret : this.ConfigService.get("secret_jwt"),
        });
    }
}
