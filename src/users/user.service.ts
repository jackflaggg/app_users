import {UserRegisterDto} from "./dto/user-register.dto";
import {User} from "./user.entity";
import {UserLoginDto} from "./dto/user-login.dto";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {IConfigService} from "../config/config.service.interface";
import {UsersRepository} from "./users.repository";

@injectable()
export class UserService implements UserService {
    constructor(@inject(TYPES.ConfigService) private configService: IConfigService,
                @inject(TYPES.UsersRepository) private usersRepository: UsersRepository) {}
    async createUser(dto: UserRegisterDto): Promise<User | null>{
        const user = new User(dto.email, dto.name);
        const salt = this.configService.get('SALT')
        await user.setPassword(dto.password, Number(salt));

        const existingUser = await this.usersRepository.find(dto.email);

        if (!existingUser){
            return null;
        }

        return user;
    };
    async validateUser(dto: UserLoginDto): Promise<boolean> {
        return true;
    };
}