import {UserServiceInterface} from "./user.service.interface";
import {UserRegisterDto} from "./dto/user-register.dto";
import {User} from "./user.entity";
import {UserLoginDto} from "./dto/user-login.dto";
import {injectable} from "inversify";

@injectable()
export class UserService implements UserServiceInterface {
    async createUser(dto: UserRegisterDto): Promise<User | null>{
        const user = new User(dto.email, dto.name);
        await user.setPassword(dto.password);
        if (!user){
            return null;
        }

        return user;
    };
    async validateUser(dto: UserLoginDto): Promise<boolean> {
        return true;
    };
}