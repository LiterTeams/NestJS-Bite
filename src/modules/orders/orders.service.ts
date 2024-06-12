import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { OrderItemsService } from "../order-item/order-items.service";
import { Prisma, Product } from "@prisma/client";
import { returnOrderObj } from "./return.order.obj";

@Injectable()
export class OrdersService {
    constructor(
        private readonly DBService: DatabaseService,
        private readonly OrderItemService: OrderItemsService,
    ){}

    async getById(id: number) {
        const order = await this.DBService.order.findUnique({where:{id}});
        if (!order) throw new NotFoundException("Order Not Found!");
        return order;
	  }

    async create(userId: number, DTO:{totalPrice:number, products: {id:number,quantity:number,price:number}[]}) {
    	const order = await this.DBService.order.create({
            data:{
                totalPrice: +DTO.totalPrice,
                user: {connect: {id: userId}},
            }
        });
        await this.OrderItemService.createMany(order.id, DTO.products);
        return order;
    }

    async getOrdersByUserId(userId: number) {
        return this.DBService.order.findMany({where:{userId}});
    }

    async findAll() {
		return this.DBService.order.findMany({select:returnOrderObj});
    }

    async update(id: number, DTO: Prisma.OrderUpdateInput) {
		return this.DBService.order.update({where:{id},data: DTO});
    }

    async switchStatus(id: number, status: "accept" | "reject" | "done") {
        const order = await this.getById(id);
        return await this.update(order.id, {status: status});
    }
}
