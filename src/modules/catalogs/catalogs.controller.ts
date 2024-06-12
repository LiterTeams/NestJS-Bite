import { Controller, Get, Post, Body, Patch, Param, HttpCode, UseGuards, Delete } from "@nestjs/common";
import { CatalogsService } from "./catalogs.service";
import { Prisma } from "@prisma/client";

import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/interfaces/enum.interfaces";
import { RolesGuard } from "src/guards/roles.guard";

@Controller("catalogs")
export class CatalogsController {
    constructor(private readonly catalogsService: CatalogsService) {}

    @Roles(Role.admin,Role.moderator)
    @UseGuards(RolesGuard)
    @HttpCode(200)
    @Post()
    async create(@Body() DTO: Prisma.CatalogCreateInput) {
        await this.catalogsService.create(DTO);
    }
    
    @Get()
    async findAll() {return this.catalogsService.findAll();}

    @Get(":id")
    async findOneById(@Param("id") id: string) {return this.catalogsService.getById(+id);}

    @Get("/slug/:slug")
    async findOneBySlug(@Param("slug") slug: string) {return this.catalogsService.getBySlug(slug);}

    @Roles(Role.admin,Role.moderator)
    @UseGuards(RolesGuard)
    @HttpCode(200)
    @Patch(":id")
    async update(@Param("id") id: string, @Body() DTO: Prisma.CatalogUpdateInput) {
        await this.catalogsService.update(+id, DTO);
    }

    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    @HttpCode(200)
    @Delete(":id")
    async remove(@Param("id") id: string) {
        await this.catalogsService.remove(+id);
    }
}
