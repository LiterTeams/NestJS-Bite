import { Prisma } from "@prisma/client";
import { MFile } from "src/modules/upload/mfile.class";
import { NewsStatusEnumT } from "src/types/enum.types";

interface NewsCreateIF extends Omit<Prisma.NewsCreateInput, "image"> {
    image: MFile;
}

interface NewsUpdateIF extends Omit<Prisma.NewsUpdateInput, "image"> {
    image?: MFile;
}

interface NewsPagination {
    page: number;
    skip: number;
    take: number;
    query?: string;
    status?: NewsStatusEnumT;
    createdAt?: "asc" | "desc";
}

export type {
    NewsPagination,
    NewsCreateIF,
    NewsUpdateIF,
}