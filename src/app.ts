import express, {Express} from 'express'
import {Server} from "http";
import {UserController} from "./users/user.controller";
import {ExceptionFilter} from "./errors/exception.filter";
import {inject, injectable} from "inversify";
import {TYPES} from "./types";
import { json } from "body-parser"
import 'reflect-metadata'
import {ILoggerService} from "./logger/logger.interface";

@injectable()
export class App {
    private app: Express;
    private server: Server | undefined;
    public port: number;

    // логгер (и другие зависимости) инжектируются,
    // чтобы обеспечить их доступность в экземпляре класса App
    constructor(
        @inject(TYPES.ILoggerService) private logger: ILoggerService,
        @inject(TYPES.UserController) private userController: UserController,
        @inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter) {
        this.app = express();
        this.port = 8000;
    }

    useMiddleware(): void {
        this.app.use(json());
    }
    useRoutes() {
        // Используем роутер пользователя,
        // инжектированный через зависимость, для обработки маршрутов на /users".
        this.app.use('/users', this.userController.router)
    }
    useExceptionFilters(){
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }
    public async init() {
        this.useMiddleware()
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port, () => {
            console.log('Server is running on port: ' + this.port)
        });
        this.logger.log()
    }
}

