import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { CategoriesService } from "../categories/categories.service";
import { Prisma } from "@prisma/client";
import { returnCatalogObj } from "./return.catalog.obj";


@Injectable()
export class CatalogsService {
    constructor(
        private readonly DBService: DatabaseService,
        private readonly categoryService: CategoriesService,
    ){}

    async findAll() {
        return this.DBService.catalog.findMany({select:returnCatalogObj});
    }

    async getById(id: number) {
        const catalog = await this.DBService.catalog.findUnique({where:{id},select:returnCatalogObj});
        if (!catalog) throw new NotFoundException("Catalog Not Found!");
        return catalog;
    }

    async getBySlug(slug: string) {
        const catalog = await this.DBService.catalog.findUnique({where:{slug:slug},select:returnCatalogObj});
        if (!catalog) throw new NotFoundException("Catalog Not Found!");
        return catalog;
    }

    async create(DTO: Prisma.CatalogCreateInput) {
        return this.DBService.catalog.create({data: DTO});
    }

    async update(id: number, DTO: Prisma.CatalogUpdateInput) {
        await this.getById(id);
        return this.DBService.catalog.update({where:{id},data: DTO});
    }

    async remove(id: number) {
        await this.getById(id);
        return this.DBService.catalog.delete({where:{id}})
    }
}
