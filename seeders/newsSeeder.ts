import { PrismaClient, News } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
const uploadPath = "http://localhost:5000/uploads";

const newsSeeder = async (quantity: number) => {
    const data: Pick<News, "title" | "image" | "status" | "userId" | "category" | "description">[] = [
        {userId:1,title:faker.lorem.word(32),description:faker.lorem.text(),category:"promotion",status:"published",image:`${uploadPath}/news/1.webp`},
        {userId:1,title:faker.lorem.word(32),description:faker.lorem.text(),category:"news",status:"published",image:`${uploadPath}/news/2.webp`},
        {userId:1,title:faker.lorem.word(32),description:faker.lorem.text(),category:"promotion",status:"published",image:`${uploadPath}/news/3.webp`},
        {userId:1,title:faker.lorem.word(32),description:faker.lorem.text(),category:"promotion",status:"published",image:`${uploadPath}/news/4.webp`},
        {userId:1,title:faker.lorem.word(32),description:faker.lorem.text(),category:"news",status:"published",image:`${uploadPath}/news/5.webp`},
        {userId:1,title:faker.lorem.word(32),description:faker.lorem.text(),category:"news",status:"published",image:`${uploadPath}/news/6.webp`},
        {userId:1,title:faker.lorem.word(32),description:faker.lorem.text(),category:"news",status:"published",image:`${uploadPath}/news/7.webp`},
        {userId:1,title:faker.lorem.word(32),description:faker.lorem.text(),category:"promotion",status:"published",image:`${uploadPath}/news/8.webp`},
        {userId:1,title:faker.lorem.word(32),description:faker.lorem.text(),category:"news",status:"published",image:`${uploadPath}/news/9.webp`},
        {userId:1,title:faker.lorem.word(32),description:faker.lorem.text(),category:"promotion",status:"published",image:`${uploadPath}/news/10.webp`},
        {userId:1,title:faker.lorem.word(32),description:faker.lorem.text(),category:"news",status:"published",image:`${uploadPath}/news/11.webp`},
        {userId:1,title:faker.lorem.word(32),description:faker.lorem.text(),category:"news",status:"archived", image:`${uploadPath}/news/12.webp`},
    ];
    await prisma.news.createMany({data,skipDuplicates:true});
    console.log(`Created ${data.length} news`);
}

export default newsSeeder;