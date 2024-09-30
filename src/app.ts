import express, {Express} from 'express'
import {Server} from "http";
import {LoggerService} from "./logger/logger.service";
import {UserController} from "./users/user.controller";

export class App {
    private app: Express;
    private server: Server | undefined;
    public port: number;
    public logger: LoggerService
    public userController: UserController;

    // если мы хотим передавать в конструктор всегда логгер!
    constructor(logger: LoggerService, userController: UserController) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.userController = userController
    }

    useRoutes() {
        // можем обращаться к роутеру, потому что мы имеем через гет доступ к роутеру
        this.app.use('/users', this.userController.router)
    }

    public async init() {
        this.useRoutes();
        this.server = this.app.listen(this.port, () => {
            console.log('Server is running on port: ' + this.port)
        });
        this.logger.log()
    }
}

