import { Prisma } from "@prisma/client";

export const returnConfigurationObj:Prisma.ConfigurationSelect = {
    id: true,
    user: true,
    items: {
        select: {
            product: true,
        }
    },
    createdAt: true,
    updatedAt: true,
}