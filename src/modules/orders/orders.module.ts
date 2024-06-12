import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrderItemsService } from "../order-item/order-items.service";
import { OrdersController } from "./orders.controller";

@Module({
    controllers: [OrdersController],
    providers: [OrdersService, OrderItemsService],
})
export class OrdersModule {}
