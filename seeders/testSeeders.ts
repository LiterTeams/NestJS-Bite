import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

import userSeeder from "./userSeeder";
import catalogSeeder from "./catalogSeeder";
import categorySeeder from "./categorySeeder";
import providerSeeder from "./providerSeeder";
import manufacturSeeder from "./manufacturSeeder";
import productSeeder from "./productSeeder";
import orderSeeder from "./orderSeeder";
import configurationSeeder from "./configurationSeeder";
import favoriteSeeder from "./favoriteSeeder";
import newsSeeder from "./newsSeeder";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    console.log("Start Seeding...");
    await userSeeder();
    await catalogSeeder();
    await categorySeeder();
    await providerSeeder();
    await manufacturSeeder();
    await productSeeder(64);
    await orderSeeder(24, {min:2, max: 12});
    await configurationSeeder(6);
    await favoriteSeeder(6);
    await newsSeeder(64);
    console.log("End Seeding");
}

main()
    .catch(error => console.log(error))
    .finally(async () => {await prisma.$disconnect()});