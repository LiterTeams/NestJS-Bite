import { PrismaClient, Product, User, Favorite } from "@prisma/client";
import randomNumber from "src/lib/randomNumber";

const prisma = new PrismaClient();

const favoriteSeeder = async (quantity: number) => {
    const favorites: Favorite[] = [];

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

        for (let j = 0; j < products.length; j++){
            const favorite = await prisma.favorite.create({
                data:{
                    user: {connect:{id: user.id}},
                    product: {connect:{id: products[j].id}},
                }
            });
            favorites.push(favorite)
        }
    } 

    console.log(`Created ${favorites.length} favorites`);
}

export default favoriteSeeder;