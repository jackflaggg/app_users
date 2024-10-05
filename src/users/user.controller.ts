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

@injectable()
export class UserController extends BaseController implements IUserController {
    // вызвать bindRoutes
    // туда прибиндить то, что сейчас находится в логин и регистре то, что находится
    // вызвать супер и добавить в апп

    constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
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

    register(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction){
        console.log(req.body);
        this.ok(res, 'register')
    }

}