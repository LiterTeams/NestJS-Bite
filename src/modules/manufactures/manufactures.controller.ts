import { Controller, Get, Post, Body, Patch, Param, HttpCode, Delete, UseGuards } from "@nestjs/common";
import { ManufacturesService } from "./manufactures.service";
import { Prisma } from "@prisma/client";

import { Auth } from "src/decorators/auth.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/interfaces/enum.interfaces";
import { RolesGuard } from "src/guards/roles.guard";

@Controller("manufactures")
export class ManufacturesController {
    constructor(private readonly manufacturesService: ManufacturesService) {}

    @HttpCode(200)
    @Post()
    @Auth()
    @Roles(Role.admin,Role.moderator)
    @UseGuards(RolesGuard)
    async create(@Body() DTO: Prisma.ManufactureCreateInput) {
        return this.manufacturesService.create(DTO);
    }

    @Get()
    async findAll() {
        return this.manufacturesService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.manufacturesService.getById(+id);
    }

    @Patch(":id")
    @Auth()
    @Roles(Role.admin,Role.moderator)
    @UseGuards(RolesGuard)
    async update(@Param("id") id: string, @Body() DTO: Prisma.ManufactureUpdateInput) {
        return this.manufacturesService.update(+id, DTO);
    }

    @Delete(":id")
    @Auth()
    @Roles(Role.admin,Role.moderator)
    @UseGuards(RolesGuard)
    async remove(@Param("id") id: string) {
        return this.manufacturesService.remove(+id);
    }
}
