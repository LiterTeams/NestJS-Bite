import { Controller, Get, Post, HttpCode, UseGuards, UseInterceptors, UploadedFiles, Param, BadRequestException } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";
import { fileStorage } from "./storage";
import { FileValidatePipe } from "src/pipes/FileValidate.pipe";

import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/interfaces/enum.interfaces";
import { RolesGuard } from "src/guards/roles.guard";
import { Auth } from "src/decorators/auth.decorator";

@Controller("upload")
export class UploadController {

    constructor(private readonly uploadService: UploadService) {}

    @Roles(Role.admin,Role.moderator)
    @UseGuards(RolesGuard)
    @Get()
    async getAllFiles() {return await this.uploadService.getAllFiles()}

    @Roles(Role.admin,Role.moderator)
    @UseGuards(RolesGuard)
    @Get("/images")
    async getImages() {
        return await this.uploadService.getImages();
    }

    @Roles(Role.admin,Role.moderator)
    @UseGuards(RolesGuard)
    @Get("/videos")
    async getVideos() {return await this.uploadService.getVideos()}

    @Roles(Role.admin,Role.moderator)
    @UseGuards(RolesGuard)
    @Get("/notes")
    async getNotes() {return await this.uploadService.getNotes()}

    @Roles(Role.admin,Role.moderator)
    @UseGuards(RolesGuard)
    @Get("/recently/:type")
    async getRecently(@Param("type") type: string) {
        if (type === "images") return await this.uploadService.getRecentlyImages();
        if (type === "videos") return await this.uploadService.getRecentlyVideos();
        if (type === "notes") return await this.uploadService.getRecentlyNotes();
        return new BadRequestException("Unknown Error");
    }

    @HttpCode(200)
    @Post()
    @Auth()
    // @Roles(Role.admin,Role.moderator,Role.user)
    // @UseGuards(RolesGuard)
    @UseInterceptors(FilesInterceptor("file",32,{storage:fileStorage}))
    async uploadFile(@UploadedFiles(new FileValidatePipe()) files: Express.Multer.File[]) {
        return this.uploadService.saveFiles(files);
    }

}
