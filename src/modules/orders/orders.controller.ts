import { Controller, Get, Post, Body, Patch, Param, HttpCode, UseGuards, Delete } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { Prisma, Product } from "@prisma/client";

import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/interfaces/enum.interfaces";
import { RolesGuard } from "src/guards/roles.guard";
import { Auth } from "src/decorators/auth.decorator";
import { CurrentUser } from "src/decorators/user.decorator";

@Controller("orders")
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @HttpCode(200)
    @Post()
    @Auth()
    create(@CurrentUser("id") userId: number, @Body() DTO:{totalPrice:number, products: {id:number,quantity:number,price:number}[]}) {
        return this.ordersService.create(userId, DTO);
    }

    @Get()
    @Auth()
    findAll() {return this.ordersService.findAll();}

    @Get(":id")
    @Auth()
    findOne(@Param("id") id: string) {return this.ordersService.getById(+id);}

    @Patch(":id")
    @Auth()
    @Roles(Role.admin,Role.moderator)
    @UseGuards(RolesGuard)
    update(@Param("id") id: string, @Body() DTO: Prisma.OrderUpdateInput) {
        return this.ordersService.update(+id, DTO);
    }

    @HttpCode(200)
    @Auth()
    @Roles(Role.admin,Role.moderator)
    @UseGuards(RolesGuard)
    @Patch("switch-status/:id")
    async switchStatus(@Param("id") id: string, @Body() DTO: Prisma.UserUpdateInput) {
        return this.ordersService.update(+id, DTO);
    }
}
