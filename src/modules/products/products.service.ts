import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { Prisma } from "@prisma/client";
import { returnProductObj } from "./return.product.obj";


@Injectable()
export class ProductsService {
    constructor(private readonly DBService: DatabaseService){}

    async getById(id: number) {
        const product = await this.DBService.product.findUnique({where:{id},select:returnProductObj});
        if (!product) throw new NotFoundException("Product Not Found!");
        return product;
	}

    async create(DTO: Prisma.ProductCreateInput) {
    	  return this.DBService.product.create({data: DTO});
    }

    async filter(title:string) {
        return this.DBService.product.findMany({where:{category:{title:title}},select:returnProductObj});
    }

    async findAll(query: string) {
		return this.DBService.product.findMany({where:{title:{contains:query}},select:returnProductObj});
    }

    async findBySlyg(slug: string) {
        return this.DBService.product.findUnique({where:{slug:slug},select:returnProductObj})
    }

    async update(id: number, DTO: Prisma.ProductUpdateInput) {
        await this.getById(id);
		return this.DBService.product.update({where:{id},data: DTO});
    }

    async remove(id: number) {
        await this.getById(id);
        return this.DBService.product.delete({where:{id}})
    }
}
