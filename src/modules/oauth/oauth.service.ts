import bcryptCompare from "src/lib/bcryptCompare";
import bcryptHash from "src/lib/bcryptHash";
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../users/users.service";
import { TokenService } from "../token/token.service";
import { DatabaseService } from "../database/database.service";
import { Prisma } from "@prisma/client";

import { SignInIF, SignInResponseIF } from "src/interfaces/oauth.interfaces";

@Injectable()
export class OauthService {

    private readonly origins: string[] = ["http://localhost:4000", "http://localhost:3000"];
    private readonly roles: string[] = ["admin", "moderator"];

    constructor(
        private readonly configService: ConfigService,
        private readonly tokenService: TokenService,
		private readonly usersService: UsersService,
		private readonly DBService: DatabaseService,
        
    ){}

    async signIn(DTO:SignInIF, origin: string) {
        if (!this.origins.includes(origin)) throw new UnauthorizedException("Unknown domain!");

        const user = await this.usersService.getByEmail(DTO.email);
        if (!user) throw new UnauthorizedException("неверный логин или пароль");

        if (user.blocking) throw new UnauthorizedException("Отказано в доступе! Аккаунт заблокирован.");

        const validatePassword = await bcryptCompare(DTO.password, user.password);
        if (!validatePassword) throw new UnauthorizedException("неверный логин или пароль!");
        
        if (origin.startsWith(this.origins[0])) {
            if (!this.roles.includes(user.role)) throw new UnauthorizedException("Авторизация доступна только администраторам и модераторам!");
        }

        const payload = {id:user.id, role:user.role}
        const tokens = await this.tokenService.generateJwtTokens(payload);
        const { password, ...props } = user;
        return {...props, ...tokens};
    }

    async regenerateTokens(refreshToken:string) {
        const result = await this.tokenService.regenerateJwtToken(refreshToken);
        if (!result) throw new UnauthorizedException("Недействительный токен обновления");

        const user = await this.usersService.getById(result.id);
        const payload = {id:user.id, role:user.role}
        const tokens = await this.tokenService.generateJwtTokens(payload);
        const { password, ...props } = user;
        return {...props, ...tokens};
    }

    async signUp(DTO: Prisma.UserCreateInput): Promise<SignInResponseIF> {

        const existsUser = await this.usersService.getByEmail(DTO.email);
        if (existsUser) throw new BadRequestException("Пользователь уже существует");

        DTO.password = await bcryptHash(DTO.password, Number(this.configService.get("salt")));;

        const user = await this.DBService.user.create({data: DTO});
        const payload = {id:user.id, role:user.role}
        const tokens = await this.tokenService.generateJwtTokens(payload);
        const { password, ...props } = user;
        return {...props, ...tokens};
    }
}
