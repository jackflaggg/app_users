import {UserModel} from "@prisma/client";

export const userModelMapper = (user: any) : UserModel => {
    const {id, email, password, name} = user;
    return {
        id,
        email,
        password,
        name,
    }
}