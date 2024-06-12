import { Prisma } from "@prisma/client";

export const returnOrderObj:Prisma.OrderSelect = {
    id: true,
    totalPrice: true,
    user: true,
    status: true,
    items: {select:{product: true, price: true, quantity: true}},
    createdAt: true,
    updatedAt: true,
}