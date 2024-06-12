import { diskStorage } from "multer";
import { randomUUID } from "crypto";
import { MFile } from "./mfile.class";

const rootDestination = "./uploads";

const generateId = (): string => randomUUID();

const generateFileName = (request, file:MFile, callback) => {
    const fileExtension = file.originalname.split(".").pop();
    callback(null, `${generateId()}.${fileExtension}`);
}

const generateDestination = (request, file:MFile, callback) => {
    const fileMimetype = file.mimetype.split("/")[0];
    switch(fileMimetype){
        case "image": callback(null, `${rootDestination}/images`);
        case "video": callback(null, `${rootDestination}/videos`);
        default: callback(null, `${rootDestination}/notes`);
    }
    
}

export const fileStorage = diskStorage({
    filename: generateFileName,
    destination: generateDestination,
});