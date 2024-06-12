import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProvidersService {

    constructor(private readonly DBService: DatabaseService){}

    async getById(id: number) {
        const provider = await this.DBService.provider.findUnique({where:{id}});
        if (!provider) throw new NotFoundException("Provider Not Found!");
        return provider;
    }

    async create(DTO: Prisma.ProviderCreateInput) {
        return this.DBService.provider.create({data:DTO});
    }

    async findAll() {
        return this.DBService.provider.findMany({});
    }

    async update(id: number, DTO: Prisma.ProviderUpdateInput) {
        await this.getById(id);
        return this.DBService.provider.update({where:{id},data: DTO});
    }

    async remove(id: number) {
        await this.getById(id);
        return this.DBService.provider.delete({where:{id}});
    }
}
