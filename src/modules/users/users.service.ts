import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { Prisma } from "@prisma/client";
import { returnUserObj } from "./return.user.obj";
import { returnOrderObj } from "../orders/return.order.obj";
import { returnFavoriteObj } from "../favorites/return.favorite.obj";

@Injectable()
export class UsersService {
	constructor(private readonly DBService: DatabaseService) {}

	async getById(id: number) {
		const user = await this.DBService.user.findUnique({where:{id},select:returnUserObj});
		if (!user) throw new NotFoundException("User Not Found!");
		return user;
	}

	async toggleFavorite(user_id:number, product_id:number) {
		return null;
	}

	async getProfiles() {
		let res = await this.DBService.user.findMany({orderBy:{role:"desc"},select:returnUserObj});
		return res;
	}

	async getProfileOrders(user_id: number){
        return this.DBService.order.findMany({where:{userId: user_id}, select:returnOrderObj, orderBy:{createdAt:"desc"}});
	}

	async getProfileFavorites(user_id: number){
        return this.DBService.favorite.findMany({where:{userId: user_id}, select:returnFavoriteObj});
	}

	async getByEmail(email:string) {
		const user = this.DBService.user.findUnique({where:{email:email}});
		if (!user) throw new NotFoundException("User Not Found!");
		return user;
	}

	async update(id: number, DTO: Prisma.UserUpdateInput) {
		return this.DBService.user.update({where:{id},data: DTO});
	}

	// async switchRole(id: number, role: "user" | "moderator" | "admin") {
	// 	const user = await this.getById(id);
	// 	return this.DBService.user.update({
	// 		where:{id:user.id},
	// 		data:{role},
	// 	})
	// }

	async toggleBlock(id: number) {
		const user = await this.getById(id);
		return await this.update(user.id, {blocking: !user.blocking})
	}

	async deleteProfile(id: number) {
		return this.DBService.user.delete({where:{id}})
	}
}
