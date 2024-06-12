import { PrismaClient, Product, User, Configuration } from "@prisma/client";
import randomNumber from "src/lib/randomNumber";

const prisma = new PrismaClient();

const configurationSeeder = async (quantity: number) => {
    const configurations: Configuration[] = [];

    const productCounts = await prisma.product.count();
    const userCounts = await prisma.user.count();

    for (let i = 0; i < quantity; i++){
        const user: User = await prisma.user.findFirst({where:{id: randomNumber(1, userCounts)}});
        const skip = Math.max(0, Math.floor(Math.random() * productCounts) - 6);

        const products: Product[] = await prisma.product.findMany({
            take: randomNumber(1, productCounts - 1),
            skip: skip,
            orderBy: {createdAt: "desc"},
        });

        const configuration = await prisma.configuration.create({
            data:{
                user: {connect:{id: user.id}},
                items: {createMany:{data:products.map(product => {
                    const productId = product.id;
                    return {productId: productId}
                }), skipDuplicates: true}},
            }
        });
        console.log(`Created ${products.length} products for configuration`);
        configurations.push(configuration);
    } 

    console.log(`Created ${configurations.length} configurations`);
}

export default configurationSeeder;