import { PrismaClient, Manufacture} from "@prisma/client";
import slugGenerate from "src/lib/slugGenerate";

const prisma = new PrismaClient();

const manufacturSeeder = async () => {
    const data: Pick<Manufacture, "manufacture" | "slug">[] = [
        {manufacture:"Nvidia", slug:slugGenerate("Nvidia")},
        {manufacture:"Asus", slug:slugGenerate("Asus")},
        {manufacture:"AMD", slug:slugGenerate("AMD")},
        {manufacture:"Gigabyte", slug:slugGenerate("Gigabyte")},
        {manufacture:"Intel", slug:slugGenerate("Intel")},
        {manufacture:"MSI", slug:slugGenerate("MSI")},
        {manufacture:"ATI", slug:slugGenerate("ATI")},
        {manufacture:"ASRock", slug:slugGenerate("ASRock")},
        {manufacture:"Matrox", slug:slugGenerate("Matrox")},
    ];
    await prisma.manufacture.createMany({data,skipDuplicates:true});
    console.log(`Created ${data.length} Manufacturies`);
}

export default manufacturSeeder;