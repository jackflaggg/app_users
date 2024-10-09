import express, {Express} from 'express'
import {Server} from "http";
import {inject, injectable} from "inversify";
import {TYPES} from "./types";
import { json } from "body-parser"
import 'reflect-metadata'
import {ILoggerService} from "./logger/logger.interface";
import {IConfigService} from "./config/config.service.interface";
import {IExceptionFilter} from "./errors/exception.filter.interface";
import {UserController} from "./users/user.controller";
import {LoggerService} from "./logger/logger.service";
import {PrismaService} from "./common/db/prisma.service";
import {exampleAppContainer} from "./main";

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
        @inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
        @inject(TYPES.PrismaService) private prismaService: PrismaService,
        @inject(TYPES.ConfigService) private configService: IConfigService,) {
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
        this.useMiddleware();
        this.useRoutes();
        this.useExceptionFilters();
        await this.prismaService.connect();
        this.server = this.app.listen(this.port, () => {
            console.log('Server is running on port: ' + this.port)
        });
        this.logger.log()
    }
}

