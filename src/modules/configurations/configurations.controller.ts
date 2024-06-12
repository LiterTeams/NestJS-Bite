import { Controller, Get, Post, Body, Patch, Param, HttpCode, Delete } from '@nestjs/common';
import { ConfigurationsService } from "./configurations.service";
import { Prisma } from "@prisma/client";

@Controller('configurations')
export class ConfigurationsController {
    constructor(private readonly configurationsService: ConfigurationsService) {}

    @HttpCode(200)
    @Post()
    async create(@Body() DTO: {user_id: number, items: number[]}) {
        return this.configurationsService.create(DTO);
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {return this.configurationsService.getById(+id);}

    @HttpCode(200)
    @Patch(":id")
    async update(@Param("id") id: string, @Body() DTO: Prisma.ConfigurationUpdateInput) {
        return this.configurationsService.update(+id, DTO);
    }

    @HttpCode(200)
    @Delete(":id")
    async remove(@Param("id") id: string) {return this.configurationsService.remove(+id);}
}
