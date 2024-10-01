import express, {Express} from 'express'
import {Server} from "http";
import {LoggerService} from "./logger/logger.service";
import {UserController} from "./users/user.controller";
import {ExceptionFilter} from "./errors/exception.filter";

export class App {
    private app: Express;
    private server: Server | undefined;
    public port: number;
    public logger: LoggerService
    public userController: UserController;
    public exceptionFilter: ExceptionFilter;

    // если мы хотим передавать в конструктор всегда логгер!
    constructor(logger: LoggerService, userController: UserController, exceptionFilter: ExceptionFilter) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.userController = userController;
        this.exceptionFilter = exceptionFilter;
    }

    useRoutes() {
        // можем обращаться к роутеру, потому что мы имеем через геттер абстрактного класса доступ к роутеру
        this.app.use('/users', this.userController.router)
    }
    useExceptionFilters(){
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }
    public async init() {
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port, () => {
            console.log('Server is running on port: ' + this.port)
        });
        this.logger.log()
    }
}

