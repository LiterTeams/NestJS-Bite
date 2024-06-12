import { Controller, Get, Post, Body, Param, HttpCode, Delete } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { Prisma } from "@prisma/client";

@Controller("favorites")
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @HttpCode(200)
    @Post()
    create(@Body() DTO: Prisma.FavoriteCreateInput) {
        return this.favoritesService.create(DTO);
    }

    @Get(":user_id")
    async getFavoritesByUserId(@Param("user_id") user_id: string) {
        return this.favoritesService.getFavoritesByUserId(+user_id);
    }

    @HttpCode(200)
    @Delete(":id")
    async remove(@Param("id") id: string) {return this.favoritesService.remove(+id);}
}
