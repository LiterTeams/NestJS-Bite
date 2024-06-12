import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { Prisma } from "@prisma/client";
import { returnConfigurationObj } from "./return.configuration.obj";

@Injectable()
export class ConfigurationsService {
    constructor(private readonly DBService: DatabaseService) {}

    async getById(id: number) {
      const configuration = await this.DBService.configuration.findUnique({where:{id},select:returnConfigurationObj});
      if (!configuration) throw new NotFoundException("Configuration Not Found!");
      return configuration;
    }

    async create(DTO: {user_id: number, items: number[]}) {
        return this.DBService.configuration.create({
            data:{
                user: {connect:{id:DTO.user_id}},
                items: {createMany:{data:DTO.items.map(item => {
                    const productId = item;
                    return {productId: productId}
                }), skipDuplicates: true}},
            }
        });
    }

    async findAll() {
        return this.DBService.configuration.findMany({select:returnConfigurationObj,orderBy:{createdAt:"desc"}});
    }

    async getConfigurationByUserId(user_id: number) {
        delete returnConfigurationObj.user;
        return this.DBService.configuration.findMany({where:{userId:user_id},select:returnConfigurationObj});
    }

    async update(id: number, DTO: Prisma.ConfigurationUpdateInput) {
        return `This action updates a #${id} configuration`;
    }

    async remove(id: number) {
        return this.DBService.configuration.delete({where:{id}});
    }
}
