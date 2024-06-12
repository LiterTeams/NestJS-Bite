import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, UseGuards } from "@nestjs/common";
import { NewsService } from "./news.service";
import { Prisma } from "@prisma/client";
import { NewsPagination } from "src/interfaces/news.interfaces";

import { Auth } from "src/decorators/auth.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/interfaces/enum.interfaces";
import { RolesGuard } from "src/guards/roles.guard";

@Controller("news")
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @HttpCode(200)
    @Post()
    @Auth()
    @Roles(Role.admin,Role.moderator)
    @UseGuards(RolesGuard)
    async create(@Body() DTO: Prisma.NewsCreateInput) {return this.newsService.create(DTO);}

    @Get()
    async findAll(@Query() paginationDTO: NewsPagination){
        return this.newsService.findAll(paginationDTO);
    }

    @Get("/random")
    async findRandom(){
        return this.newsService.findRandom();
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {return this.newsService.getById(+id);}

    @Auth()
    @Roles(Role.admin,Role.moderator)
    @UseGuards(RolesGuard)
    @HttpCode(200)
    @Patch(":id")
    async update(@Param("id") id: string, @Body() DTO: Prisma.NewsUpdateInput) {
        return this.newsService.update(+id, DTO);
    }

    @Auth()
    @Roles(Role.admin,Role.moderator)
    @UseGuards(RolesGuard)
    @HttpCode(200)
    @Patch("switch-status/:id")
    async switchStatus(@Param("id") id: string, @Body() DTO: Prisma.UserUpdateInput) {
        return this.newsService.update(+id, DTO);
    }

    @Auth()
    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    @HttpCode(200)
    @Delete(":id")
    async remove(@Param("id") id: string) {await this.newsService.remove(+id);}
}

