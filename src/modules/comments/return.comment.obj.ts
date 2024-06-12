import { Prisma } from "@prisma/client";
import { returnUserObj } from "../users/return.user.obj";

export const returnCommentObj:Prisma.CommentSelect = {
    id: true,
    user: {
        select: returnUserObj,
    },
    product: {
        select: {
            id: true,
        },
    },
    rating: true,
    comment: true,
    createdAt: true,
    updatedAt: true,
}