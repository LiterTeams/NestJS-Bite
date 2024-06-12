import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Prisma } from "@prisma/client";

import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/interfaces/enum.interfaces";
import { RolesGuard } from "src/guards/roles.guard";

@Controller("products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Roles(Role.admin,Role.moderator)
    @UseGuards(RolesGuard)
    @HttpCode(200)
    @Post()
    async create(@Body() DTO: Prisma.ProductCreateInput) {
        return this.productsService.create(DTO);
    }

    @Get()
    async findAll(@Query("query") query:string) {
        return this.productsService.findAll(query);
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {return this.productsService.getById(+id);}

    @Get("/slug/:slug")
    async findBySlyg(@Param("slug") slug: string) {return this.productsService.findBySlyg(slug);}

    @Roles(Role.admin,Role.moderator)
    @UseGuards(RolesGuard)
    @HttpCode(200)
    @Patch(":id")
    async update(@Param("id") id: string, @Body() DTO: Prisma.ProductUpdateInput) {
        await this.productsService.update(+id, DTO);
    }

    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    @HttpCode(200)
    @Delete(":id")
    async remove(@Param("id") id: string) {await this.productsService.remove(+id);}
}
