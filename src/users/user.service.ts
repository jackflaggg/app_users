import {UserRegisterDto} from "./dto/user-register.dto";
import {User} from "./user.entity";
import {UserLoginDto} from "./dto/user-login.dto";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {IConfigService} from "../config/config.service.interface";

@injectable()
export class UserService implements UserService {
    constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}
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