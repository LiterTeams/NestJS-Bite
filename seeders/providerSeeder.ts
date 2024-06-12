import { PrismaClient, Provider } from "@prisma/client";

const prisma = new PrismaClient();

const providerSeeder = async () => {
    const data: Pick<Provider, "name" | "phone" | "address" | "description">[] = [
        {name:"Артемий Лебедев", phone:"7-664-245-46-75", address:null, description:"Поставщик комплектующих"},
        {name:"Саша грей", phone:"9-734-503-43-23", address:null, description:"Поставщик мебели"},
        {name:"Арсений Валерьевич", phone:"6-345-534-89-42", address:null, description:"Поставщик зарубежной техники"},
        {name:"Анастасия Влаческо", phone:"8-534-892-34-92", address:null, description:"Поставщик расходных материалов"},
    ];
    await prisma.provider.createMany({data,skipDuplicates:true});
    console.log(`Created ${data.length} Providers`);
}

export default providerSeeder;