import { Controller, Get, Body, Patch, Param, Delete, UseGuards, HttpCode } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Prisma } from "@prisma/client";
import { Auth } from "src/decorators/auth.decorator";
import { CurrentUser } from "src/decorators/user.decorator";


@Controller("users")
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get("profile")
    @Auth()
    async getProfile(@CurrentUser("id") id:number) {return this.userService.getById(+id);}

    @Auth()
    @HttpCode(200)
    @Patch("profile")
    async updateProfile(@CurrentUser("id") id:number, @Body() DTO: Prisma.UserUpdateInput) {
        const response = await this.userService.update(+id, DTO);
        delete response.password;
        return response;
    }

    @Auth()
    @HttpCode(200)
    @Patch("profile/favorites/:productId")
    async toggleFavorite(@CurrentUser("id") id:number, @Param("productId") productId:string) {
        return await this.userService.toggleFavorite(id, +productId);
    }

    @Get("profile/orders")
    @Auth()
    async getOrders(@CurrentUser("id") id:number) {return this.userService.getProfileOrders(id);}

    @Get()
    async getAll() {return this.userService.getProfiles();}

    @Get(":id")
    async getOne(@Param("id") id: string) {return this.userService.getById(+id);}

    @Get(":id/favorites")
    async getProfileFavorites(@Param("id") id: string) {return this.userService.getProfileFavorites(+id);}

    @HttpCode(200)
    @Patch("toggle-block/:id")
    async toggleBlock(@Param("id") id: string) {return await this.userService.toggleBlock(+id);}
}
