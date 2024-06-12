import { PrismaClient, Product, User, Order, OrderItem } from "@prisma/client";
import randomNumber from "src/lib/randomNumber";

const prisma = new PrismaClient();

const createOrderItem = async (order: Order, products: Product[]) => {
    const orderItems: OrderItem[] = [];
    
    for (let i = 0; i < products.length; i++){
        const orderItem: OrderItem = await prisma.orderItem.create({
            data:{
                quantity: randomNumber(1,4),
                price: products[i].price,
                product:{connect:{id: products[i].id}},
                order:{connect:{id: order.id}}
            }
        });

        orderItems.push(orderItem);
    }

    console.log(`Created ${orderItems.length} orderItems for order: ${order.id}`);

}

const orderSeeder = async (quantity: number, productQuantity: {min:number, max: number}) => {
    const orders: Order[] = [];
    const productCounts = await prisma.product.count();
    const userCounts = await prisma.user.count();

    for (let i = 0; i < quantity; i++){
        const user: User = await prisma.user.findFirst({where:{id: randomNumber(1, userCounts),}});

        const skip = Math.max(0, Math.floor(Math.random() * productCounts) - productQuantity.max);

        const products: Product[] = await prisma.product.findMany({
            take: randomNumber(productQuantity.min, productQuantity.max),
            skip: skip,
            orderBy: {createdAt: "desc"},
        });

        const totalPrice = products.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);

        const order = await prisma.order.create({
            data:{
                totalPrice: totalPrice,
                user: {connect:{id: user.id}},
            }
        });

        await createOrderItem(order, products);

        orders.push(order);
    }

    console.log(`Created ${orders.length} orders`);
}

export default orderSeeder;