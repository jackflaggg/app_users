export const TYPES = {
    Application: Symbol.for("Application"),

    LoggerService: Symbol.for("LoggerService"),
    ILoggerService: Symbol.for("ILoggerService"),

    UserService: Symbol.for("UserService"),
    UserServiceInterface: Symbol.for("UserServiceInterface"),

    UserController: Symbol.for("UserController"),
    IUserController: Symbol.for("IUserController"),

    IExceptionFilter: Symbol.for("IExceptionFilter"),
    ExceptionFilter: Symbol.for("ExceptionFilter"),

    HTTPError: Symbol.for("HTTPError"),

    IControllerRoute: Symbol.for("IControllerRoute"),

    ConfigService: Symbol.for("ConfigService"),
    IConfigService: Symbol.for("IConfigService"),

    PrismaService: Symbol.for("PrismaService"),
}