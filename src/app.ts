import express, {Express} from 'express'
import {Server} from "http";
import {UserController} from "./users/user.controller";
import {ExceptionFilter} from "./errors/exception.filter";
import {ILogger} from "./logger/logger.interface";
import {inject, injectable} from "inversify";
import {TYPES} from "./types";
import { json } from "body-parser"
import 'reflect-metadata'

@injectable()
export class App {
    private app: Express;
    private server: Server | undefined;
    public port: number;

    // если мы хотим передавать в конструктор всегда логгер!
    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.UserController) private userController: UserController,
        @inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter) {
        this.app = express();
        this.port = 8000;
    }

    useMiddleware(): void {
        this.app.use(json());
    }
    useRoutes() {
        // можем обращаться к роутеру, потому что мы имеем через геттер абстрактного класса доступ к роутеру
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

