// import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
// import { randomUUID } from "crypto";
// import { MFile } from "src/modules/upload/mfile.class";

// @Injectable()
// export class FilterFilePipe implements PipeTransform<Express.Multer.File, Promise<string>> {

//     private fileImageAccept = ["png", "jpe", "jpeg", "webp", "avif"];
//     private fileVideoAccept = ["mp4", "webm", "avi"];
//     private fileDocAccept = ["docs", "txt", "js"];

//   async transform(files: MFile[]) {
//     return await Promise.all(files.map(async file => {
//         const mimetype = file.mimetype;
//         const fileFormat = file.originalname.split(".")[1];
//         const fileBuffer = file.buffer;
        
//         if (!mimetype.includes("image")) return new BadRequestException("File Format Not Supported");
        
//         let newFileBuffer: Buffer | null = fileBuffer;
//         const newFile = {buffer:newFileBuffer, mimetype:mimetype, originalname:`${randomUUID()}.webp`}
//         return new MFile(newFile);
//     }));
//   }

// }