import { PrismaClient, Catalog } from "@prisma/client";
import slugGenerate from "src/lib/slugGenerate";

const prisma = new PrismaClient();
const uploadPath = "http://localhost:5000/uploads";

const catalogSeeder = async () => {
    const data: Pick<Catalog, "title" | "slug" | "image">[] = [
        {
            title:"Комплектующие для ПК",
            slug:slugGenerate("Комплектующие для ПК"),
            image:`${uploadPath}/catalogs/1.webp`
        },
        {
            title:"Периферия",
            slug:slugGenerate("Периферия"),
            image:`${uploadPath}/catalogs/2.webp`
        },
        {
            title:"Программное обеспечение",
            slug:slugGenerate("Программное обеспечение"), image:`${uploadPath}/catalogs/3.webp`
        },
        {
            title:"Электроника",
            slug:slugGenerate("Электроника"),
            image:`${uploadPath}/catalogs/4.webp`
        },
        {
            title:"Оргтехника",
            slug:slugGenerate("Оргтехника"),
            image:`${uploadPath}/catalogs/5.webp`
        },
        {
            title:"Кабели и переходники",
            slug:slugGenerate("Кабели и переходники"),
            image:`${uploadPath}/catalogs/6.webp`
        },
        {
            title:"Инструменты и электротовары",
            slug:slugGenerate("Инструменты и электротовары"),
            image:`${uploadPath}/catalogs/7.webp`
        },
        {
            title:"Мебель",
            slug:slugGenerate("Мебель"),
            image:`${uploadPath}/catalogs/8.webp`
        },
        {
            title:"Расходные материалы",
            slug:slugGenerate("Расходные материалы"),
            image:`${uploadPath}/catalogs/9.webp`
        },
    ];
    await prisma.catalog.createMany({data,skipDuplicates:true});
    console.log(`Created ${data.length} catalogs`);
}

export default catalogSeeder;