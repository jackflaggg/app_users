import {BaseController} from "../common/base.controller";
import {Request, Response, NextFunction} from "express";
import {HTTPError} from "../errors/http-error.class";
import {ILoggerService} from "../logger/logger.interface";
import {inject, injectable} from "inversify";
import {TYPES} from "../typess/types";
import 'reflect-metadata'
import {IUserController} from "./user.interface";
import {UserLoginDto} from "./dto/user-login.dto";
import {UserRegisterDto} from "./dto/user-register.dto";
import {User} from "./user.entity";
import {IUserService} from "./user.service.interface";
import {ValidateMiddleware} from "../common/validate.middleware";
import {sign} from "jsonwebtoken"
import {IConfigService} from "../config/config.service.interface";
import {AuthGuard} from "./dto/auth-guard";

@injectable()
export class UserController extends BaseController implements IUserController {
    // вызвать bindRoutes
    // туда прибиндить то, что сейчас находится в логин и регистре то, что находится
    // вызвать супер и добавить в апп

    constructor(
        @inject(TYPES.ILoggerService) private loggerService: ILoggerService,
        @inject(TYPES.UserService) private userService: IUserService,
        @inject(TYPES.ConfigService) private configService: IConfigService,) {
        super(loggerService);
        this.bindRoutes([
            {
                path: '/register',
                method: 'post',
                func: this.register,
                middlewares: [new ValidateMiddleware(UserRegisterDto)] },
            {
                path: '/login',
                method: 'post',
                func: this.login,
                middlewares: [new ValidateMiddleware(UserLoginDto)] },
            {
                path: '/info',
                method: 'get',
                func: this.info,
                middlewares: [new AuthGuard()] },
        ])
    }

    async login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction){
        try {
            const result = await this.userService.validateUser(req.body);
            if(!result){
                return next(new HTTPError(422, 'Такого пользователя нет'));
            }
            const jwt = await this.signJWT(req.body.email, this.configService.get('SECRET_KEY'))
            this.ok(res, { jwt })
        } catch (e: unknown){
            if (e instanceof Error) {
                console.error(e);
                next(new HTTPError(500, 'Ошибка при логинизации'));
            }
            next(new HTTPError(401, 'Логинизация'))
        }
    }

    async register(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction){
        const newUser = new User(req.body.email, req.body.name);
        try {
            const result = await this.userService.createUser(req.body)
            if (!result){
                return next(new HTTPError(422, 'Такой пользователь есть'));
            }
            this.ok(res, { email: result.email, id: result.id })
        } catch (e){
            console.error(e);
            next(new HTTPError(500, 'Ошибка при регистрации'));
        }
    }

    private signJWT(email: string, secret: string): Promise<string>{
        return new Promise<string>((resolve, reject) => {
            sign({
                    email,
                iat: Math.floor(Date.now()/1000)
            },
                secret,
                {
                    algorithm: 'HS256',
                }, (err, token) => {
                if (err) return reject(err);
                resolve(String(token));
                })
        });
    }

    async info(req: Request, res: Response, next: NextFunction): Promise<void>{
        const {user} = req.body;
        const userInfo = await this.userService.getUserInfo(user)
        this.ok(res, { email: userInfo})
    }
}