// import { Injectable, PipeTransform } from "@nestjs/common";
// import { parse, join } from "path";
// import * as sharp from "sharp";
// import { MFile } from "src/modules/upload/mfile.class";

// @Injectable()
// export class SharpPipe implements PipeTransform<Express.Multer.File, Promise<string>> {

//   async transform(files: Express.Multer.File[]): Promise<MFile[]> {
//     let newFiles: MFile[] = [];
//     files.forEach(async file => {
//         const originalName = parse(file.originalname).name;
//         const filename = `${Date.now()}-${originalName}.webp`;
//         const fileFormat = file.originalname.split(".")[1];
//         const buffer = file.buffer;
//         await sharp(buffer).resize(800).webp({ effort: 3 }).toFile(join("uploads", filename));
//         newFiles.push(filename);
//     });
//   }

// }