import { Prisma } from "@prisma/client";

export const returnNewsObj:Prisma.NewsSelect = {
    id: true,
    user: true,
    title: true,
    category: true,
    image: true,
    description: true,
    status: true,
    createdAt: true,
    updatedAt: true,
}