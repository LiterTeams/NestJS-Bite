import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { Prisma } from "@prisma/client";
import { returnFavoriteObj } from "./return.favorite.obj";

@Injectable()
export class FavoritesService {
    constructor(private readonly DBService: DatabaseService) {}

    async getById(id: number) {
      const favorite = await this.DBService.user.findUnique({where:{id},select:returnFavoriteObj});
      if (!favorite) throw new NotFoundException("Favorite Not Found!");
      return favorite;
    }


    create(DTO: Prisma.FavoriteCreateInput) {
      return 'This action adds a new favorite';
    }

    async getFavoritesByUserId(user_id: number) {
        delete returnFavoriteObj.user;
        return this.DBService.favorite.findMany({where:{userId:user_id},select:returnFavoriteObj});
    }

    async remove(id: number) {
        // await this.getById(id);
        return this.DBService.favorite.delete({where:{id}});
    }
}
