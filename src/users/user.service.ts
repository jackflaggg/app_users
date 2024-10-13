import {UserRegisterDto} from "./dto/user-register.dto";
import {User} from "./user.entity";
import {UserLoginDto} from "./dto/user-login.dto";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {IConfigService} from "../config/config.service.interface";
import {UserModel} from "@prisma/client";
import {IUsersRepository} from "./users.repository.interface";

@injectable()
export class UserService implements UserService {
    constructor(@inject(TYPES.ConfigService) private configService: IConfigService,
                @inject(TYPES.UsersRepository) private usersRepository: IUsersRepository) {}
    async createUser(dto: UserRegisterDto): Promise<UserModel | null>{

        const user = new User(dto.email, dto.name);
        const salt = this.configService.get('SALT')
        await user.setPassword(dto.password, Number(salt));

        const existingUser = await this.usersRepository.find(dto.email)

        if (existingUser){
            return null;
        }

        return this.usersRepository.create(user);
    };
    async validateUser(dto: UserLoginDto): Promise<boolean> {
        const existingUser = await this.usersRepository.find(dto.email);
        if (!existingUser){
            return false;
        }
        const newUser = new User(existingUser.email, existingUser.name, existingUser.password);
        return await newUser.comparePassword(dto.password);
    };
}