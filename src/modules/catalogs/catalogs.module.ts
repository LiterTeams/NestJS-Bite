import { Module } from "@nestjs/common";
import { CatalogsService } from "./catalogs.service";
import { CatalogsController } from "./catalogs.controller";
import { CategoriesService } from "../categories/categories.service";

@Module({
    controllers: [CatalogsController],
    providers: [CatalogsService, CategoriesService],
})
export class CatalogsModule {}
