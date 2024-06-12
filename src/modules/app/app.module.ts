import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule as Config } from "@nestjs/config";
import { DatabaseModule as Database } from "../database/database.module";
import { OauthModule as Oaut } from "../oauth/oauth.module";
import { UsersModule as User } from "../users/users.module";
import { CatalogsModule as Catalogs } from "../catalogs/catalogs.module";
import { CategoriesModule as Categories } from "../categories/categories.module";
import { ProductsModule as Products } from "../products/products.module";
import { OrdersModule as Orders } from "../orders/orders.module";
import { OrderItemsModule as OrderItems } from "../order-item/order-items.module";
import { FavoritesModule as Favorites } from "../favorites/favorites.module";
import { CommentsModule as Comments } from "../comments/comments.module";
import { NewsModule as News } from "../news/news.module";
import { TokenModule as Token } from "../token/token.module";
import { ManufacturesModule as Manufactures } from "../manufactures/manufactures.module";
import { ProvidersModule as Providers } from "../providers/providers.module";
import { UploadModule as Upload } from "../upload/upload.module";
import { ConfigurationsModule as Configurations } from "../configurations/configurations.module";

import config from "../../configs/config";

@Module({
    imports: [
        Config.forRoot({isGlobal: true, load: [config]}),
        Database,
        Oaut,
        User,
        Manufactures,
        Providers,
        Catalogs,
        Categories,
        Products,
        Orders,
        Comments,
        OrderItems,
        News,
        Favorites,
        Token,
        Configurations,
        Upload,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
