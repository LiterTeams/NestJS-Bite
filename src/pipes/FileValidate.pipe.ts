import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { MFile } from "src/modules/upload/mfile.class";

@Injectable()
export class FileValidatePipe implements PipeTransform {

    private extensionError = {message: "Неподдерживаемое расширение файла", error: "extension", status: 400};
    private sizeError = {message: "Файл слишком большой или маленький", error: "size", status: 400};

    private minFileSize = 1024; // 1 KB
    private maxImageSize = 1024**2 * 64; // 64 MB
    private maxVideoSize = 1024**3 * 8; // 8 GB
    private maxNoteSize = 1024**2 * 24 // 24 MB

    private allowedImageExtensions = ["png","jpg","jpeg","webp","avif"];
    private allowedVideoExtensions = ["mp4","webm","avi"];
    private allowedNotesExtensions = ["txt","docx","doc","js","ogg","mp3"];
    private allowedExtensions = this.allowedImageExtensions.
        concat(this.allowedVideoExtensions,this.allowedNotesExtensions);

    private checkExtension = (extension:string) => this.allowedExtensions.includes(extension);
    private checkSize = (size:number,extension:string) => {
        if (this.allowedImageExtensions.includes(extension))
            return size >= this.minFileSize && size <= this.maxImageSize; 
        
        if (this.allowedVideoExtensions.includes(extension))
            return size >= this.minFileSize && size <= this.maxVideoSize; 
        
        if (this.allowedNotesExtensions.includes(extension))
            return size >= this.minFileSize && size <= this.maxNoteSize; 
        
        return false;
    }

    transform(files: MFile[]) {
        const validFiles: MFile[] = [];
        files.forEach(file => {
            // let extension = file.mimetype.split("/")[1];
            let extension = file.filename.split(".")[1];
            let size = file.size;
            if (!this.checkExtension(extension)) return new BadRequestException(this.extensionError);
            if (!this.checkSize(size,extension)) return new BadRequestException(this.sizeError)
            validFiles.push(file);
        });
        return validFiles;
    }
}