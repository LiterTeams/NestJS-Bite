import { PrismaClient, Category} from "@prisma/client";
import slugGenerate from "src/lib/slugGenerate";

const prisma = new PrismaClient();
const uploadPath = "http://localhost:5000/uploads";

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

export default categorySeeder;