import { NestFactory, HttpAdapterHost } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";
import { ConfigService } from "@nestjs/config";
import { PrismaExceptionFilter } from "./modules/prisma/prisma.exception.filter";
import * as express from "express";
import { join } from "path";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.use("/uploads", express.static(join(__dirname, "..", "..", "uploads")));
    app.setGlobalPrefix(configService.get("prefix"));
    app.useGlobalFilters(new PrismaExceptionFilter(httpAdapter));
    app.enableCors({
        origin:["http://localhost:3000","http://localhost:4000"],
        allowedHeaders: ["Content-Type", "Origin", "X-Requested-With", "Accept", "Authorization"],
        exposedHeaders: ["Authorization"],
        methods: ["GET", "POST", "PATCH", "DELETE"],
        credentials: true,
    });
    await app.listen(configService.get("port"));
}
bootstrap();
