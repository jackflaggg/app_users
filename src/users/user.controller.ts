import {BaseController} from "../common/base.controller";
import {Request, Response, NextFunction} from "express";
import {HTTPError} from "../errors/http-error.class";
import {ILogger} from "../logger/logger.interface";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import 'reflect-metadata'
import {IUserController} from "./user.interface";
import {UserLoginDto} from "./dto/user-login.dto";
import {UserRegisterDto} from "./dto/user-register.dto";
import {User} from "./user.entity";
import {UserServiceInterface} from "./user.service.interface";

@injectable()
export class UserController extends BaseController implements IUserController {
    // вызвать bindRoutes
    // туда прибиндить то, что сейчас находится в логин и регистре то, что находится
    // вызвать супер и добавить в апп

    constructor(
        @inject(TYPES.ILogger) private loggerService: ILogger,
        @inject(TYPES.UserService) private userService: UserServiceInterface) {
        super(loggerService);
        this.bindRoutes([
            { path: '/register', method: 'post', func: this.register },
            { path: '/login', method: 'post', func: this.login },
        ])
    }

    login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction){
        console.log(req.body);
        next(new HTTPError(401, 'Авторизация'))
    }

    async register(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction){
        const newUser = new User(req.body.email, req.body.name);
        try {
            const result = await this.userService.createUser(req.body)
            if (!result){
                return next(new HTTPError(422, 'Такой пользователь есть'));
            }
            this.ok(res, { email: result.email })
        } catch (e){
            console.error(e);
            next(new HTTPError(500, 'Ошибка при регистрации'));
        }
    }

}