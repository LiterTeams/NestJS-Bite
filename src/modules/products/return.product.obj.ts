import { Prisma } from "@prisma/client";

export const returnProductObj:Prisma.ProductSelect = {
    id: true,
    title: true,
    images: true,
    category: {
        select:{
            title: true,
            slug: true,
            catalog: {
                select: {
                    title: true,
                    slug: true,
                }
            }
        }
    },
    manufacture: true,
    comments: {
        select:{
            user: {
                select: {
                    avatar: true,
                    fullName: true,
                }
            },
            comment: true,
            createdAt: true,
            rating: true,
        },
        orderBy:{createdAt:"desc"}
    },
    description: true,
    price: true,
    amount: true,
    discount: true,
    createdAt: true,
    updatedAt: true,
}