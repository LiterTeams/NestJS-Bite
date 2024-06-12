export class MFile {
    buffer:Buffer;
    mimetype:string;
    size:number;
    path:string;
    originalname:string;
    filename:string;

    constructor(file: Express.Multer.File | MFile) {
        this.buffer = file.buffer;
        this.mimetype = file.mimetype;
        this.size = file.size;
        this.path = file.path;
        this.originalname = file.originalname;
        this.filename = file.filename;
    }
}