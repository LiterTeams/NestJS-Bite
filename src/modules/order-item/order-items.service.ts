import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { Prisma, Product } from "@prisma/client";

@Injectable()
export class OrderItemsService {
    constructor(private readonly DBService: DatabaseService){}

    async create(orderId: number, productId: number, quantity:number, price: number) {
        return this.DBService.orderItem.create({
            data:{
                order:{connect:{id:orderId}},
                product:{connect:{id:+productId}},
                quantity: quantity,
                price: price,
            }
        });
    }

    async createMany(orderId: number, products: {id:number,quantity:number,price:number}[]) {
        products.forEach((product) => this.create(orderId, product.id, product.quantity, product.price));
    }

    async findAll() {
        return this.DBService.orderItem.findMany({select:{order:{include:{items:true}}}});
    }

    async findOne(order_id: number) {
        return this.DBService.orderItem.findMany({where:{orderId:order_id}});
    }
}
