import { PrismaClient, Product } from "@prisma/client";
import { faker } from "@faker-js/faker";
import slugGenerate from "src/lib/slugGenerate";
import randomNumber from "src/lib/randomNumber";

const prisma = new PrismaClient();

const productSeeder = async (quantity: number) => {
    const products: Product[] = [];
    for (let i = 0; i < quantity; i++){
        const title = faker.commerce.productName();

        const product = await prisma.product.create({
            data:{
                title: title,
                slug: slugGenerate(title),
                description: faker.commerce.productDescription(),
                price: randomNumber(10,9999),
                amount: randomNumber(2,24),
                images: Array.from({length: randomNumber(2,6)}).map(()=>faker.image.url()),
                category:{connect:{id:randomNumber(1,34)}},
                discount: `${randomNumber(0,100)}%`,
                manufacture: {connect:{id:randomNumber(1,9)}},
                comments:{
                    create:[
                        {
                            user:{connect:{id:randomNumber(1,7)}},
                            rating: randomNumber(1,5),
                            comment: faker.lorem.paragraph(),
                        },
                        {
                            user:{connect:{id:randomNumber(1,7)}},
                            rating: randomNumber(1,5),
                            comment: faker.lorem.paragraph(),
                        }
                    ]
                }
            }
        });
        products.push(product);
    }

    console.log(`Created ${products.length} products`);
}

export default productSeeder;