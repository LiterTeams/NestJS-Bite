import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { Prisma } from "@prisma/client";
// import * as sharp from "sharp";
import { randomUUID } from "crypto";
import { MFile } from "./mfile.class";
import { join } from "path";
import { access, mkdir, writeFile } from "fs/promises";


@Injectable()
export class UploadService {

    private host = "localhost";
    private port = "5000";
    private folder = "uploads";
    private baseURL = `${this.host}:${this.port}/${this.folder}`;

    constructor(private readonly DBService: DatabaseService){}

    async saveFiles(files: MFile[]) {
        files.forEach(async file => {
            const name = file.filename.split(".")[0];
            const extension = file.mimetype.split("/")[1];
            
            if (file.mimetype.startsWith("image")){
                const newFile = {url:`${this.baseURL}/images/${file.filename}`,name:name,extension:extension as "png" | "jpg" | "jpeg" | "webp" | "avif"}
                await this.DBService.image.create({data:newFile});
            }
            
            if (file.mimetype.startsWith("video")) {
                const newFile = {url:`${this.baseURL}/videos/${file.filename}`,name:name,extension:extension as "mp4" | "webm" | "avi"}
                await this.DBService.video.create({data:newFile});
            }
            
            if (!file.mimetype.startsWith("image") && !file.mimetype.startsWith("video")) {
                const newFile = {url:`${this.baseURL}/notes/${file.filename}`,name:name,extension:extension as "txt" | "doc" | "docx" | "ogg" | "mp3"}
                await this.DBService.note.create({data:newFile});
            }
        });

        return files;
    }

    async getAllFiles() {
        const images = await this.getImages();
        const videos = await this.getVideos();
        const notes = await this.getNotes();
        return {images,videos,notes};
    }
    async getAllRecentlyFiles() {
        const images = await this.getRecentlyImages();
        const videos = await this.getRecentlyVideos();
        const notes = await this.getRecentlyNotes();
        return {images,videos,notes};
    }

    async getRecentlyImages() {
        
    }
    async getRecentlyVideos() {

    }
    async getRecentlyNotes() {

    }

    async getImages() {
        return await this.DBService.image.findMany();
    }

    async getVideos() {
        return await this.DBService.video.findMany();
    }

    async getNotes() {
        return await this.DBService.note.findMany();
    }
}