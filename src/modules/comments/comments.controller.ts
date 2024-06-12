import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { Prisma } from "@prisma/client";
import { Auth } from "src/decorators/auth.decorator";
import { CurrentUser } from "src/decorators/user.decorator";

@Controller("comments")
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Get()
    async getAll(){
        return this.commentsService.getAll();
    }

    @Get("average-rating/:productId")
    async getAverageProductRating(@Param(":productId") productId: number){
        return this.commentsService.getAverageRatingByProductId(productId);
    }

    @HttpCode(200)
    @Post("leave/:productId")
    @Auth()
    async create(@Param("productId") productId: number, @CurrentUser("id") userId:number, @Body() DTO: Prisma.CommentCreateInput) {
        return this.commentsService.create(+userId,+productId,DTO);
    }
}
