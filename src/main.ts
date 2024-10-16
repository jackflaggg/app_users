import {App} from "./app";
import {LoggerService} from "./logger/logger.service";
import {UserController} from "./users/user.controller";
import {ExceptionFilter} from "./errors/exception.filter";
import { Container, ContainerModule, interfaces } from "inversify"
import {ILoggerService} from "./logger/logger.interface";
import {TYPES} from "./typess/types";
import {IExceptionFilter} from "./errors/exception.filter.interface";
import {UserService} from "./users/user.service";
import {IUserService} from "./users/user.service.interface";
import {IUserController} from "./users/user.interface";
import {IConfigService} from "./config/config.service.interface";
import {ConfigService} from "./config/config.service";
import {PrismaService} from "./common/db/prisma.service";
import {UsersRepository} from "./users/users.repository";
import {IUsersRepository} from "./users/users.repository.interface";

// контейнер всех зависимостей
// Он связывает интерфейсы с конкретными реализациями с помощью метода bind
export const appContainers = new ContainerModule((bind: interfaces.Bind) => {
    bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService).inSingletonScope();
    bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter).inSingletonScope();
    bind<IUserController>(TYPES.UserController).to(UserController).inSingletonScope();
    bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();
    bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
    bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
    bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
    bind<App>(TYPES.Application).to(App).inSingletonScope();
});

function bootstrap() {
    // создаем контейнер
    const exampleAppContainer = new Container();
    // прокидываем все зависимости
    exampleAppContainer.load(appContainers);
    // получаем экземпляр приложения
    const app = exampleAppContainer.get<App>(TYPES.Application);
    // инициализируем приложение
    app.init();
    return { exampleAppContainer, app }
}

export const {app, exampleAppContainer} = bootstrap();
