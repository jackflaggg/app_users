import {IUsersRepository} from "./users.repository.interface";
import {User} from "./user.entity";
import {UserModel} from "@prisma/client";
import {TYPES} from "../types";
import {inject} from "inversify";
import {PrismaService} from "../common/db/prisma.service";

export class UsersRepository implements IUsersRepository {
    constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}
    async create(user: User) : Promise<UserModel>{
        const {email, password, name} = user;
        return this.prismaService.client.userModel.create({
            data: {
                email,
                password,
                name
            },
        });
    };
    async find(emailUser: string) : Promise<UserModel | null>{

    };
    async delete(userId: string) : Promise<void>{

    };
}