import {UserServiceInterface} from "./user.service.interface";
import {UserRegisterDto} from "./dto/user-register.dto";
import {User} from "./user.entity";
import {UserLoginDto} from "./dto/user-login.dto";

export class UserService implements UserServiceInterface {
    createUser(dto: UserRegisterDto): User | null{
        const user = new User(dto.email, dto.name);

        if (!user){
            return null;
        }

        return user;
    };
    validateUser(dto: UserLoginDto): boolean {
        return true;
    };
}