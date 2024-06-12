import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { Prisma } from "@prisma/client";
import { returnCommentObj } from "./return.comment.obj";

@Injectable()
export class CommentsService {
    constructor(private readonly DBService: DatabaseService) {}

    async getById(id: number) {
        const comment = await this.DBService.comment.findUnique({where:{id}});
        if (!comment) throw new NotFoundException("Comment Not Found!");
        return comment;
    }

    async getAll() {
        return this.DBService.comment.findMany({select:returnCommentObj,orderBy:{createdAt:"desc"}});
    }

    async create(userId: number, productId: number, DTO: Prisma.CommentCreateInput) {
        return this.DBService.comment.create({
            data:{
              user: {connect:{id:userId}},
              product: {connect:{id:productId}},
              comment: DTO.comment,
              rating: DTO.rating,
            }
        })
    }

    async getAverageRatingByProductId(productId: number) {
      return this.DBService.comment.aggregate({
          where: {productId},
          _avg: {rating: true}
      }).then(data => data._avg);
    }
}
