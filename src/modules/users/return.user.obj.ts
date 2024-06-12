import { Prisma } from "@prisma/client";

export const returnUserObj:Prisma.UserSelect = {
    id: true,
    avatar: true,
    fullName: true,
    role: true,
    email: true,
    address: true,
    blocking: true,
    phone: true,
    password: false,
    createdAt: true,
}