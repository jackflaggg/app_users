import {IUsersRepository} from "./users.repository.interface";
import {User} from "./user.entity";
import {UserModel} from "@prisma/client";
import {TYPES} from "../typess/types";
import {inject, injectable} from "inversify";
import {PrismaService} from "../common/db/prisma.service";
import {userModelMapper} from "../mapper/userModel.mapper";

@injectable()
export class UsersRepository implements IUsersRepository {
    constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}
    async create(user: User) : Promise<UserModel>{
        const {email, password, name} = user;

        const createUser = await this.prismaService.client.userModel.create({
            data: {
                email,
                password,
                name
            },
        });
        return userModelMapper(createUser);
    };
    async find(emailUser: string) : Promise<UserModel | null>{
        const findUser = await this.prismaService.client.userModel.findFirst({
            where: {
                email: emailUser
            }
        });
        if (!findUser) return null;
        return userModelMapper(findUser);
    };
    async delete(userId: number) : Promise<boolean>{
        const findUser = await this.prismaService.client.userModel.findFirst({
            where: {
                id: userId
            }
        });
        if (!findUser) return false;
        const deleteUser = await this.prismaService.client.userModel.delete({
            where: {
                id: findUser.id
            },
        });
        return true;
    };
}