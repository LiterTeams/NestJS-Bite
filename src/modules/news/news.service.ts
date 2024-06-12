import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { Prisma } from "@prisma/client";
import { NewsPagination } from "src/interfaces/news.interfaces";
import { returnNewsObj } from "./return.news.obj";

import { NEWS_SKIP_DEFAULT, NEWS_TAKE_DEFAULT, NEWS_STATUS_DEFAULT, ORDER_BY_CREATED_AT_DEFAULR } from "src/conts/const";
import { MetaIF } from "src/interfaces/system.interfaces";

@Injectable()
export class NewsService {
    constructor(private readonly DBService: DatabaseService){}

    async getById(id: number) {
        const news = await this.DBService.news.findUnique({where:{id},select:returnNewsObj});
        if (!news) throw new NotFoundException("News Not Found!");
        return news;
    }

    async create(DTO: Prisma.NewsCreateInput) {
        return this.DBService.news.create({data: DTO});
    }

    async findAll(options: NewsPagination) {

        const query = options.query || "";
        const page = +options.page || 1;
        const skip = +options.skip || NEWS_SKIP_DEFAULT;
        const take = +options.take || NEWS_TAKE_DEFAULT;
        const slice = page === 1 ? 0 : skip * (page - 1);
        const orderBy = options.createdAt || ORDER_BY_CREATED_AT_DEFAULR;
        // const status = options.status || undefined;

        const meta: MetaIF = {pages:0};

        if (true){
            const data = await this.DBService.news.findMany({
                where:{title: {startsWith:query}},
                skip: slice,
                take: take,
                orderBy:{createdAt: orderBy},
                select:returnNewsObj
            });
            const items = await this.DBService.news.aggregate({where:{title:{startsWith:query}}, _count: true});
            meta.pages = Math.round(items._count / skip);
            return {data, meta};
        }

        const data = await this.DBService.news.findMany({
            where:{title: {startsWith:query}},
            skip: slice,
            take: take,
            orderBy:{createdAt: orderBy},
        });
        const items = await this.DBService.news.aggregate({where:{title:{startsWith:query}}, _count: true});
        meta.pages = Math.round(items._count / skip);
        return {data, meta};
    }

    async findRandom() {
        const newsCount = await this.DBService.news.count();
        const skip = Math.floor(Math.random() * newsCount);
        return await this.DBService.news.findMany({
            where:{status:"published"},
            take: 12,
            skip: skip,
            orderBy: {createdAt: ORDER_BY_CREATED_AT_DEFAULR}
        });
    }

    async update(id: number, DTO: Prisma.NewsUpdateInput) {
        await this.getById(id);
        return this.DBService.news.update({where:{id},data: DTO});
    }

    async remove(id: number) {
        await this.getById(id);
        return this.DBService.news.delete({where:{id}})
    }
}
