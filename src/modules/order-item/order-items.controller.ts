import { Controller, Get, Post, Body, HttpCode, Param } from "@nestjs/common";
import { OrderItemsService } from "./order-items.service";
import { Prisma } from "@prisma/client";

@Controller("order-items")
export class OrderItemsController {
    constructor(private readonly orderItemsService: OrderItemsService) {}

    // @HttpCode(200)
    // @Post()
    // async create(@Body() DTO: Prisma.OrderItemCreateInput) {
    //     return this.orderItemsService.create(DTO);
    // }

    @Get()
    async findAll() {return this.orderItemsService.findAll();}

    @Get(":id")
    async findOne(@Param("id") id: string) {return this.orderItemsService.findOne(+id);}
}
