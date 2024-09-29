import express, {Express} from 'express'
import {userRouter} from "./users/users";
import {Server} from "http";
import {LoggerService} from "./logger/logger.service";

export class App {
    private app: Express;
    private server: Server | undefined;
    public port: number;
    public logger: LoggerService

    // если мы хотим передавать в конструктор всегда логгер!
    constructor(logger: LoggerService) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
    }

    useRoutes() {
        this.app.use('/users', userRouter)
    }
    public async init() {
        this.useRoutes();
        this.server = this.app.listen(this.port, () => {
            console.log('Server is running on port: ' + this.port)
        });
        this.logger.log()

    }
}

