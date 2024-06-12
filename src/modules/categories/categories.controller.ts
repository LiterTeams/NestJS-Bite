import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Query } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { Prisma } from "@prisma/client";

import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/interfaces/enum.interfaces";
import { RolesGuard } from "src/guards/roles.guard";

@Controller("categories")
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Roles(Role.admin,Role.moderator)
    @UseGuards(RolesGuard)
    @HttpCode(200)
    @Post()
    async create(@Body() DTO: Prisma.CategoryCreateInput) {
        await this.categoriesService.create(DTO);
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {return this.categoriesService.getById(+id);}

    @Get("/slug/:slug")
    async findBySlug(@Param("slug") slug: string) {return this.categoriesService.findBySlug(slug);}

    @Roles(Role.admin,Role.moderator)
    @UseGuards(RolesGuard)
    @HttpCode(200)
    @Patch(":id")
    async update(@Param("id") id: string, @Body() DTO: Prisma.CategoryUpdateInput) {
        await this.categoriesService.update(+id, DTO);
    }

    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    @HttpCode(200)
    @Delete(":id")
    async remove(@Param("id") id: string) {
        await this.categoriesService.remove(+id);
    }
}
