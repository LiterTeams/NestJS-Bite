import { Controller, Post, Body, HttpCode, Headers, UseGuards } from "@nestjs/common";
import { OauthService } from "./oauth.service";
import { Prisma } from "@prisma/client";

import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/interfaces/enum.interfaces";
import { RolesGuard } from "src/guards/roles.guard";

import { SignInIF } from "src/interfaces/oauth.interfaces";
import { TokensIF } from "src/interfaces/tokens.interfaces";

@Controller("oauth")
export class OauthController {
    constructor(private readonly oauthService: OauthService) {}
    
    @Roles(Role.guest)
    @UseGuards(RolesGuard)
    @HttpCode(200)
    @Post("/sign-in")
    async signIn(@Headers("origin") origin: string, @Body() DTO: SignInIF) {
        return this.oauthService.signIn(DTO, origin);
    }

    @HttpCode(200)
    @Post("/sign-in/regenerate-tokens")
    async regenerateTokens(@Body() DTO: Pick<TokensIF, "refreshToken">) {
        return this.oauthService.regenerateTokens(DTO.refreshToken);
    }

    @Roles(Role.guest)
    @UseGuards(RolesGuard)
    @HttpCode(200)
    @Post("/sign-up")
    async signUp(@Body() DTO: Prisma.UserCreateInput) {
        return this.oauthService.signUp(DTO);
    }
}
