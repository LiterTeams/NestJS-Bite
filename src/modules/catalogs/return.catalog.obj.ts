import { Prisma } from "@prisma/client";

export const returnCatalogObj:Prisma.CatalogSelect = {
    id: true,
    slug: true,
    title: true,
    image: true,
    createdAt: true,
    categories: {
        select:{
            id: true,
            title: true,
            slug: true,
            image: true,
            products:true
        }
    },
}