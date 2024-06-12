import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class ManufacturesService {
    constructor(private readonly DBService: DatabaseService){}

    async getById(id: number) {
      const manufacture = await this.DBService.manufacture.findUnique({where:{id}});
      if (!manufacture) throw new NotFoundException("Manufacture Not Found!");
      return manufacture;
  }

    async create(DTO: Prisma.ManufactureCreateInput) {
        return this.DBService.manufacture.create({data:DTO});
    }

    async findAll() {
      return this.DBService.manufacture.findMany({});
    }

    async update(id: number, DTO: Prisma.ManufactureUpdateInput) {
        await this.getById(id);
        return this.DBService.manufacture.update({where:{id},data: DTO});
    }

    async remove(id: number) {
        await this.getById(id);
        return this.DBService.manufacture.delete({where:{id}});
    }
}
