import { PrismaClient, User, Catalog, Category, Provider, Manufacture, Product, OrderItem, Order, Configuration, Favorite, News } from "@prisma/client";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const uploadPath = "http://localhost:5000/uploads";

// Functions

const slugGenerate = (value:string): string => {
    let answer = "";
    const converter = {
		'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
		'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
		'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
		'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
		'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
		'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
		'э': 'e',    'ю': 'yu',   'я': 'ya',
 
		'А': 'A',    'Б': 'B',    'В': 'V',    'Г': 'G',    'Д': 'D',
		'Е': 'E',    'Ё': 'E',    'Ж': 'Zh',   'З': 'Z',    'И': 'I',
		'Й': 'Y',    'К': 'K',    'Л': 'L',    'М': 'M',    'Н': 'N',
		'О': 'O',    'П': 'P',    'Р': 'R',    'С': 'S',    'Т': 'T',
		'У': 'U',    'Ф': 'F',    'Х': 'H',    'Ц': 'C',    'Ч': 'Ch',
		'Ш': 'Sh',   'Щ': 'Sch',  'Ь': '',     'Ы': 'Y',    'Ъ': '',
		'Э': 'E',    'Ю': 'Yu',   'Я': 'Ya'
	};

    for (let i = 0; i < value.length; ++i ) {
		const word = value[i];
		answer += word in converter ? converter[word] : word
	}
 
	return answer.toLowerCase().replaceAll(" ", "-");
}

const randomNumber = (min:number, max:number):number => Math.floor(Math.random() * (max - min + 1) + min);

function getMultipleRandom(array: string[], num: number): string[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

const productImages = [
    "https://www.regard.ru/api/photo/goods/1000139",
    "https://www.regard.ru/api/photo/goods/951252",
    "https://www.regard.ru/api/photo/goods/6111149",
    "https://www.regard.ru/api/photo/goods/6092297",
    "https://www.regard.ru/api/photo/goods/835467",
    "https://www.regard.ru/api/photo/goods/6020677",
    "https://www.regard.ru/api/photo/goods/6025171",
    "https://www.regard.ru/api/photo/goods/5963548",
    "https://www.regard.ru/api/photo/goods/6077662",
    "https://www.regard.ru/api/photo/goods/1000142",
    "https://www.regard.ru/api/photo/goods/6054217",
    "https://www.regard.ru/api/photo/goods/6059178",
    "https://www.regard.ru/api/photo/goods/6053049",
    "https://www.regard.ru/api/photo/goods/263658",
    "https://www.regard.ru/api/photo/goods/1051662",
    "https://www.regard.ru/api/photo/goods/1068798",
    "https://www.regard.ru/api/photo/goods/5949897",
    "https://www.regard.ru/api/photo/goods/685450",
    "https://www.regard.ru/api/photo/goods/143309",
    "https://www.regard.ru/api/photo/goods/5936845",
    "https://www.regard.ru/api/photo/goods/695393",
    "https://www.regard.ru/api/photo/goods/4583",
    "https://www.regard.ru/api/photo/goods/6007987",
    "https://www.regard.ru/api/photo/goods/655316",
    "https://www.regard.ru/api/photo/goods/291466",
    "https://www.regard.ru/api/photo/goods/861079",
    "https://www.regard.ru/api/photo/goods/6098711",
    "https://www.regard.ru/api/photo/goods/839085",
    "https://www.regard.ru/api/photo/goods/188967",
    "https://www.regard.ru/api/photo/goods/966930",
    "https://www.regard.ru/api/photo/goods/5940131",
    "https://www.regard.ru/api/photo/goods/65639",
    "https://www.regard.ru/api/photo/goods/370107",
    "https://www.regard.ru/api/photo/goods/743667",
    "https://www.regard.ru/api/photo/goods/6107038",
    "https://www.regard.ru/api/photo/goods/5940914",
    "https://www.regard.ru/api/photo/goods/361905",
    "https://www.regard.ru/api/photo/goods/6071036",
    "https://www.regard.ru/api/photo/goods/1093037",
    "https://www.regard.ru/api/photo/goods/6107287",
    "https://www.regard.ru/api/photo/goods/5961695",
    "https://www.regard.ru/api/photo/goods/870036",
    "https://www.regard.ru/api/photo/goods/6032926",
    "https://www.regard.ru/api/photo/goods/6034574",
    "https://www.regard.ru/api/photo/goods/6107377",
    "https://www.regard.ru/api/photo/goods/702067",
    "https://www.regard.ru/api/photo/goods/6041553",
    "https://www.regard.ru/api/photo/goods/3477",
    "https://www.regard.ru/api/photo/goods/6108606",
    "https://www.regard.ru/api/photo/goods/5951028",
    "https://www.regard.ru/api/photo/goods/1095007",
    "https://www.regard.ru/api/photo/goods/5981620",
    "https://www.regard.ru/api/photo/goods/5963401",
    "https://www.regard.ru/api/photo/goods/1055331",
    "https://www.regard.ru/api/photo/goods/690981",
    "https://www.regard.ru/api/photo/goods/5983865",
    "https://www.regard.ru/api/photo/goods/979070",
    "https://www.regard.ru/api/photo/goods/1052189",
    "https://www.regard.ru/api/photo/goods/1097624",
    "https://www.regard.ru/api/photo/goods/6091533",
    "https://www.regard.ru/api/photo/goods/5991103",
    "https://www.regard.ru/api/photo/goods/5991270",
];

// Seeders


const userSeeder = async () => {
    const data: Pick<User, "fullName" | "avatar" | "email" | "phone" | "password" | "role">[] = [
        {
			fullName:"Salfiya NSFW",
			avatar:`${uploadPath}/avatars/1.webp`,
			email:"salfiya.nsfw@gmail.com",
			phone:"+7-901-703-45-86",
			password:"password",
			role:"admin"
		},
		{
			fullName:"Kostolom",
			avatar:`${uploadPath}/avatars/2.webp`,
			email:"kostolom@gmail.com",
			phone:"+7-901-703-45-85",
			password:"password",
			role:"moderator"
		},
		{
			fullName:"Leviafan",
			avatar:`${uploadPath}/avatars/3.webp`,
			email:"leviafan@gmail.com",
			phone:"+7-901-703-45-84",
			password:"password",
			role:"user"
		},
		{
			fullName:"Thunder Light",
			avatar:`${uploadPath}/avatars/4.webp`,
			email:"thunder.light@gmail.com",
			phone:"+7-901-703-45-83",
			password:"password",
			role:"user"
		},
		{
			fullName:"Aboba",
			avatar:`${uploadPath}/avatars/5.webp`,
			email:"aboba@gmail.com",
			phone:"+7-901-703-45-82",
			password:"password",
			role:"user"
		},
		{
			fullName:"Frost Punk",
			avatar:`${uploadPath}/avatars/6.webp`,
			email:"frost.punk@gmail.com",
			phone:"+7-901-703-45-81",
			password:"password",
			role:"user"
		},
		{
			fullName:"Slime",
			avatar:`${uploadPath}/avatars/7.webp`,
			email:"slime@gmail.com",
			phone:"+7-901-703-45-80",
			password:"password",
			role:"user"
		},
    ];
    await prisma.user.createMany({data, skipDuplicates: true});
    console.log(`Created ${data.length} users`);
}

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

const categorySeeder = async () => {
    const data: Pick<Category, "title" | "slug" | "image" | "catalogId">[] = [
        {catalogId:1,title:"Процессоры", slug:slugGenerate("Процессоры"),image:`${uploadPath}/categories/1.webp`},
        {catalogId:1,title:"Видеокарты", slug:slugGenerate("Видеокарты"),image:`${uploadPath}/categories/2.webp`},
        {catalogId:1,title:"Материнские платы", slug:slugGenerate("Материнские платы"),image:`${uploadPath}/categories/3.webp`},
        {catalogId:1,title:"Блоки питания", slug:slugGenerate("Блоки питания"),image:`${uploadPath}/categories/4.webp`},
        {catalogId:1,title:"Системы охлаждения", slug:slugGenerate("Системы охлаждения"),image:`${uploadPath}/categories/5.webp`},
        {catalogId:1,title:"SSD накопители", slug:slugGenerate("SSD накопители"),image:`${uploadPath}/categories/6.webp`},
        {catalogId:1,title:"HDD накопители", slug:slugGenerate("HDD накопители"),image:`${uploadPath}/categories/7.webp`},
        {catalogId:1,title:"Оперативная память", slug:slugGenerate("Оперативная память"),image:`${uploadPath}/categories/8.webp`},
        {catalogId:1,title:"Корпуса", slug:slugGenerate("Корпуса"),image:`${uploadPath}/categories/9.webp`},

        {catalogId:2,title:"Мониторы", slug:slugGenerate("Мониторы"),image:`${uploadPath}/categories/10.webp`},
        {catalogId:2,title:"Клавиатуры", slug:slugGenerate("Клавиатуры"),image:`${uploadPath}/categories/11.webp`},
        {catalogId:2,title:"Мыши", slug:slugGenerate("Мыши"),image:`${uploadPath}/categories/12.webp`},
        {catalogId:2,title:"Наушники и гарнитура", slug:slugGenerate("Наушники и гарнитура"),image:`${uploadPath}/categories/13.webp`},
        {catalogId:2,title:"Коврики для мыши", slug:slugGenerate("Коврики для мыши"),image:`${uploadPath}/categories/14.webp`},
        {catalogId:2,title:"Веб-камеры", slug:slugGenerate("Веб-камеры"),image:`${uploadPath}/categories/15.webp`},
        {catalogId:2,title:"Микрофоны", slug:slugGenerate("Микрофоны"),image:`${uploadPath}/categories/16.webp`},

        {catalogId:3,title:"Антивирусные программы", slug:slugGenerate("Антивирусные программы"),image:`${uploadPath}/categories/17.webp`},
        {catalogId:3,title:"Операционные системы", slug:slugGenerate("Операционные системы"),image:`${uploadPath}/categories/18.webp`},
        {catalogId:3,title:"Разное", slug:slugGenerate("Разное"),image:`${uploadPath}/categories/19.webp`},

        {catalogId:4,title:"Ноутбуки", slug:slugGenerate("Ноутбуки"),image:`${uploadPath}/categories/20.webp`},
        {catalogId:4,title:"Неттопы и платформы", slug:slugGenerate("Неттопы и платформы"),image:`${uploadPath}/categories/21.webp`},
        {catalogId:4,title:"Настольные компьютеры", slug:slugGenerate("Настольные компьютеры"),image:`${uploadPath}/categories/22.webp`},

        {catalogId:5,title:"Принтеры и МФУ", slug:slugGenerate("Принтеры и МФУ"),image:`${uploadPath}/categories/23.webp`},
        {catalogId:5,title:"Сканеры", slug:slugGenerate("Сканеры"),image:`${uploadPath}/categories/24.webp`},

        {catalogId:6,title:"Видеокабели и переходники", slug:slugGenerate("Видеокабели и переходники"), image:`${uploadPath}/categories/25.webp`},
        {catalogId:6,title:"USB кабели и переходники", slug:slugGenerate("USB кабели и переходники"),image:`${uploadPath}/categories/26.webp`},
        {catalogId:6,title:"Компьютерные кабели", slug:slugGenerate("Компьютерные кабели"),image:`${uploadPath}/categories/27.webp`},
        {catalogId:6,title:"Аудиокабели и переходники", slug:slugGenerate("Аудиокабели и переходники"),image:`${uploadPath}/categories/28.webp`},
        {catalogId:6,title:"Кабели питания", slug:slugGenerate("Кабели питания"),image:`${uploadPath}/categories/29.webp`},

        {catalogId:7,title:"Электроинструменты", slug:slugGenerate("Электроинструменты"),image:`${uploadPath}/categories/30.webp`},

        {catalogId:8,title:"Компьютерные столы", slug:slugGenerate("Компьютерные столы"),image:`${uploadPath}/categories/31.webp`},
        {catalogId:8,title:"Стулья и кресла", slug:slugGenerate("Стулья и кресла"),image:`${uploadPath}/categories/32.webp`},

        {catalogId:9,title:"Кардридеры", slug:slugGenerate("Кардридеры"),image:`${uploadPath}/categories/33.webp`},
        {catalogId:9,title:"Бумага", slug:slugGenerate("Бумага"),image:`${uploadPath}/categories/34.webp`},
    ];
    await prisma.category.createMany({data,skipDuplicates:true});
    console.log(`Created ${data.length} categories`);
}

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

const productSeeder = async (quantity: number) => {
    const products: Product[] = [];
    for (let i = 0; i < quantity; i++){
        const title = faker.commerce.productName();

        const images = productImages

        const product = await prisma.product.create({
            data:{
                title: title,
                slug: slugGenerate(title),
                description: faker.commerce.productDescription(),
                price: randomNumber(10,9999),
                amount: randomNumber(2,24),
                images: getMultipleRandom(productImages, 5),
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

const createOrderItem = async (order: Order, products: Product[]) => {
    const orderItems: OrderItem[] = [];
    
    for (let i = 0; i < products.length; i++){
        const orderItem: OrderItem = await prisma.orderItem.create({
            data:{
                quantity: randomNumber(1,4),
                price: products[i].price,
                product:{connect:{id: products[i].id}},
                order:{connect:{id: order.id}}
            }
        });

        orderItems.push(orderItem);
    }

    console.log(`Created ${orderItems.length} orderItems for order: ${order.id}`);

}

const orderSeeder = async (quantity: number, productQuantity: {min:number, max: number}) => {
    const orders: Order[] = [];
    const productCounts = await prisma.product.count();
    const userCounts = await prisma.user.count();

    for (let i = 0; i < quantity; i++){
        const user: User = await prisma.user.findFirst({where:{id: randomNumber(1, userCounts),}});

        const skip = Math.max(0, Math.floor(Math.random() * productCounts) - productQuantity.max);

        const products: Product[] = await prisma.product.findMany({
            take: randomNumber(productQuantity.min, productQuantity.max),
            skip: skip,
            orderBy: {createdAt: "desc"},
        });

        const totalPrice = products.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);

        const order = await prisma.order.create({
            data:{
                totalPrice: totalPrice,
                user: {connect:{id: user.id}},
            }
        });

        await createOrderItem(order, products);

        orders.push(order);
    }

    console.log(`Created ${orders.length} orders`);
}

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