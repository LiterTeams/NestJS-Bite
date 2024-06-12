import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { Prisma } from "@prisma/client";
import { returnCategoryObj } from "./return.category.obj";


@Injectable()
export class CategoriesService {
    constructor(private readonly DBService: DatabaseService){}

    async getById(id: number) {
        const category = await this.DBService.category.findUnique({where:{id},select:returnCategoryObj});
        if (!category) throw new NotFoundException("Category Not Found!");
        return category;
    }

    async findBySlug(slug: string) {
        const category = await this.DBService.category.findUnique({where:{slug:slug},select:returnCategoryObj});
        if (!category) throw new NotFoundException("Category Not Found!");
        return category;
    }

    async create(DTO: Prisma.CategoryCreateInput) {
        return this.DBService.category.create({data: DTO});
    }

    async getCategoriesByCatalogId(catalog_id: number) {
        return this.DBService.category.findMany({where:{catalogId:catalog_id}});
    }

    async findAll() {
        return this.DBService.category.findMany({orderBy:{catalogId:"asc"},select:returnCategoryObj});
    }

    async update(id: number, DTO: Prisma.CategoryUpdateInput) {
        await this.getById(id);
        return this.DBService.category.update({where:{id},data: DTO});
    }

    async remove(id: number) {
        await this.getById(id);
        return this.DBService.category.delete({where:{id}})
    }
}
