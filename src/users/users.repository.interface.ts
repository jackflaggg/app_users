import {User} from "./user.entity";
import {UserModel} from "@prisma/client";

export interface IUsersRepository {
    create: (user: User) => Promise<UserModel>;
    find: (emailUser: string) => Promise<UserModel | null>;
    delete: (userId: number) => Promise<boolean>;
}