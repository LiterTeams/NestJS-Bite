import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();
const uploadPath = "http://localhost:5000/uploads";

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

export default userSeeder;