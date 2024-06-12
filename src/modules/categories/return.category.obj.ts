import { Prisma } from "@prisma/client";

export const returnCategoryObj:Prisma.CategorySelect = {
    id: true,
    slug: true,
    title: true,
    image: true,
    catalog: true,
    products: true,
    createdAt: true,
}