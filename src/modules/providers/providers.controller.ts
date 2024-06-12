import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards } from "@nestjs/common";
import { ProvidersService } from "./providers.service";
import { Prisma } from "@prisma/client";

import { Auth } from "src/decorators/auth.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/interfaces/enum.interfaces";
import { RolesGuard } from "src/guards/roles.guard";

@Controller("providers")
export class ProvidersController {
    constructor(private readonly providersService: ProvidersService) {}

    @HttpCode(200)
    @Post()
    @Auth()
    @Roles(Role.admin,Role.moderator)
    @UseGuards(RolesGuard)
    async create(@Body() DTO: Prisma.ProviderCreateInput) {
        return this.providersService.create(DTO);
    }

    @Get()
    @Auth()
    @Roles(Role.admin,Role.moderator)
    async findAll() {
        return this.providersService.findAll();
    }

    @Get(":id")
    @Auth()
    @Roles(Role.admin,Role.moderator)
    async findOne(@Param("id") id: string) {
        return this.providersService.getById(+id);
    }

    @Patch(":id")
    @Auth()
    @Roles(Role.admin,Role.moderator)
    @UseGuards(RolesGuard)
    async update(@Param("id") id: string, @Body() DTO: Prisma.ProviderUpdateInput) {
        return this.providersService.update(+id, DTO);
    }

    @Delete(":id")
    @Auth()
    @Roles(Role.admin,Role.moderator)
    @UseGuards(RolesGuard)
    async remove(@Param("id") id: string) {
        return this.providersService.remove(+id);
    }
}
