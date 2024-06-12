import { Prisma } from "@prisma/client";

export const returnFavoriteObj:Prisma.FavoriteSelect = {
    id: true,
    user: true,
    product: true,
    createdAt: true,
    updatedAt: true,
}